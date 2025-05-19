import React, { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import ReactPlayer from "react-player";
import axios from "axios";
import { ThumbsUp, ThumbsDown, Share } from "lucide-react";
import SuggestedVideo from "./suggestedvideo";

const GOOGLE_KEY  = import.meta.env.VITE_YOUTUBE_API_KEY!;
const RAPID_KEY   = import.meta.env.VITE_RAPIDAPI_KEY!;
const GOOGLE_ROOT = "https://www.googleapis.com/youtube/v3";
const RAPID_ROOT  = "https://youtube138.p.rapidapi.com";

type Video = {
  snippet: { title: string; description: string; channelId: string };
  statistics: { likeCount?: string; viewCount: string };
};
type Channel = {
  snippet: { title: string; thumbnails: { default: { url: string } } };
  statistics: { subscriberCount: string };
};
type Suggested = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { medium: { url: string } };
  };
};
type Comment = {
  id: string;
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
        publishedAt: string;
        likeCount: number;
      };
    };
  };
};

export default function PlayingVideo() {
  const { id } = useParams();
  const [video, setVideo]         = useState<Video    | null>(null);
  const [channel, setChannel]     = useState<Channel  | null>(null);
  const [suggested, setSuggested] = useState<Suggested[]>([]);
  const [comments, setComments]   = useState<Comment[]>([]);

  const fmt = (n?: string) => (n ? Intl.NumberFormat("en", { notation: "compact" }).format(+n) : "0");

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        // 1. Video
        const vRes = await axios.get(`${GOOGLE_ROOT}/videos`, {
          params: { part: "snippet,statistics", id, key: GOOGLE_KEY },
        });
        if (!vRes.data.items.length) throw new Error("No video found");
        const vid: Video = vRes.data.items[0];
        setVideo(vid);

        // 2. Channel
        const chanId = vid.snippet.channelId;
        const cRes = await axios.get(`${GOOGLE_ROOT}/channels`, {
          params: { part: "snippet,statistics", id: chanId, key: GOOGLE_KEY },
        });
        setChannel(cRes.data.items[0]);

        // 3. Related Videos
        try {
          const r = await axios.get(`${GOOGLE_ROOT}/search`, {
            params: {
              part: "snippet",
              relatedToVideoId: id,
              type: "video",
              maxResults: 8,
              key: GOOGLE_KEY,
            },
          });
          const ok = r.data.items.filter((i: any) => i.id?.videoId);
          if (ok.length) {
            setSuggested(ok);
          } else {
            throw new Error("No related");
          }
        } catch {
          const rr = await axios.get(`${RAPID_ROOT}/video/related-contents/`, {
            params: { id, hl: "en", gl: "US" },
            headers: {
              "x-rapidapi-key": RAPID_KEY,
              "x-rapidapi-host": "youtube138.p.rapidapi.com",
            },
          });
          const rapidItems = (rr.data.contents || []).filter((c: any) => c.type === "video");
          const normalized: Suggested[] = rapidItems.map((c: any) => ({
            id: { videoId: c.video.videoId },
            snippet: {
              title:         c.video.title,
              channelTitle:  c.video.author.title,
              thumbnails:    { medium: { url: c.video.thumbnails[0].url } },
            },
          }));
          setSuggested(normalized);
        }

        // 4. Comments
        const commRes = await axios.get(`${GOOGLE_ROOT}/commentThreads`, {
          params: {
            part: "snippet",
            videoId: id,
            maxResults: 10,
            key: GOOGLE_KEY,
          },
        });
        setComments(commRes.data.items || []);
      } catch (e) {
        console.error("Error loading video data:", e);
      }
    })();
  }, [id]);

  if (!video || !channel) return <p className="p-6">Loading…</p>;

  return (
    <div className="mt-10 lg:mt-20 flex flex-col lg:flex-row gap-6 px-4 lg:px-8 w-full max-w-[1200px] mx-auto">
      {/* Left */}
      <div className="flex-1">
        <div className="aspect-video bg-black rounded-md overflow-hidden">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} width="100%" height="100%" controls playing />
        </div>

        <h1 className="mt-4 text-xl font-semibold text-black">{video.snippet.title}</h1>
        <p className="text-sm text-gray-700 mt-1">{fmt(video.statistics.viewCount)} views</p>

        <div className="mt-4 flex items-center gap-4">
          <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-medium text-black">{channel.snippet.title}</p>
            <p className="text-xs text-gray-600">{fmt(channel.statistics.subscriberCount)} subscribers</p>
          </div>
          <button className="ml-auto bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700">Subscribe</button>
        </div>

        <div className="mt-4 flex gap-4 ">
          <button className="flex items-center gap-1 bg-gray-500 rounded-full px-3 py-1 hover:bg-gray-300">
            <ThumbsUp size={16} /> {fmt(video.statistics.likeCount)}
          </button>
          <button className="flex items-center gap-1 bg-gray-500 rounded-full px-3 py-1 hover:bg-gray-300">
            <ThumbsDown size={16} />
          </button>
          <button className="flex items-center gap-1 bg-gray-400 rounded-full px-3 py-1 hover:bg-gray-300">
            <Share size={16} /> Share
          </button>
        </div>

        <p className="mt-4 pl-4 pt-4 whitespace-pre-line text-gray-800 border shadow-lg rounded-md bg-white">
  {video.snippet.description}
</p>


        {/* Comments */}
        <div className="mt-4 pl-4 pt-4 whitespace-pre-line text-gray-800 border shadow-lg rounded-md bg-white ">
          <h2 className="text-lg font-semibold mb-4 ">Comments</h2>
          {comments.map((c) => {
            const info = c.snippet.topLevelComment.snippet;
            return (
              <div key={c.id} className="mb-6 flex items-start gap-3">
                <img src={info.authorProfileImageUrl} alt={info.authorDisplayName} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{info.authorDisplayName}</p>
                  <p className="text-sm text-gray-700">{info.textDisplay}</p>
                  <p className="text-xs text-gray-500 mt-1">{fmt(String(info.likeCount))} likes • {new Date(info.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right */}
      <aside className="w-full lg:w-[380px] shadow-lg rounded-md">
        <SuggestedVideo videos={suggested} />
      </aside>
    </div>
  );
}
