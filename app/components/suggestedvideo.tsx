import { Link } from "@remix-run/react";

type Props = {
  videos: {
    id: { videoId: string };
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: { medium: { url: string } };
    };
  }[];
};

export default function SuggestedVideo({ videos }: Props) {
  if (!videos.length) return <p className="text-black">Loading...</p>;

  return (
    <div className="space-y-4">
      {videos.map((v) => (
        <Link
          key={v.id.videoId}
          to={`/video/${v.id.videoId}`}
          className="flex gap-3 hover:bg-gray-100 rounded-md p-2"
        >
          <img
            src={v.snippet.thumbnails.medium.url}
            alt={v.snippet.title}
            className="w-36 h-20 object-cover rounded-md shrink-0"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-black line-clamp-2">{v.snippet.title}</p>
            <p className="text-xs text-gray-600 mt-1">{v.snippet.channelTitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
