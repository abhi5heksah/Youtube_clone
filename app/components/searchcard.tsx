import { Link } from "@remix-run/react";

type YoutubeItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    description?: string;
    publishedAt?: string;
    thumbnails: {
      default: { url: string };
      high: { url: string };
    };
  };
};

interface SearchCardProps {
  video: YoutubeItem;
}

export default function SearchCard({ video }: SearchCardProps) {
  const {
    id: { videoId },
    snippet: {
      title,
      channelTitle,
      description,
      publishedAt,
      thumbnails,
    },
  } = video;

  return (
    <Link to={`/video/${videoId}`}>
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:bg-gray-100 transition duration-200 cursor-pointer">
        {/* Thumbnail */}
        <div className="w-full md:w-64 flex-shrink-0 h-40 md:h-36 rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={thumbnails?.high?.url || thumbnails?.default?.url}
            alt={title}
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 leading-snug hover:text-red-600 line-clamp-2">
            {title}
          </h3>

          {/* Channel Info */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-9 w-9 rounded-full overflow-hidden border shadow-sm">
              <img
                className="h-full w-full object-cover"
                src={thumbnails?.default?.url}
                alt={channelTitle}
              />
            </div>
            <p className="text-sm text-gray-600">{channelTitle}</p>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Published time */}
          {publishedAt && (
            <p className="text-xs text-gray-400 mt-1">
              Published: {new Date(publishedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
