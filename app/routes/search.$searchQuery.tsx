import { useState, useEffect } from "react";
import { useParams } from "@remix-run/react";
import { fetchYoutubeData } from "~/utils/rapidapi";
import Sidebar from "~/components/sidebar";
import SearchCard from "~/components/searchcard";

type YoutubeItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      default: { url: string };
      high: { url: string };
    };
  };
};

export default function Search() {
  const [result, setResult] = useState<YoutubeItem[] | undefined>(undefined);
  const { searchQuery } = useParams();

  useEffect(() => {
    fetchSearchResult();
    // eslint-disable-next-line
  }, [searchQuery]);

  const fetchSearchResult = () => {
    if (!searchQuery) return;
    fetchYoutubeData(searchQuery).then(({ items }) => {
      setResult(items);
    });
  };

  return (
    <div >
      <div className=" flex flex-row h-[calc(100%-56px)]">
      <Sidebar />
      <div className=" mt-16 grow h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden">
        <div className="grow grid grid-cols-1 gap-2 p-4">
          {result?.map((item) => {
            // Only render if item has a videoId
            if (!item.id?.videoId) return null;
            return (
              <div key={item.id.videoId}>
                <SearchCard video={item} />
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}