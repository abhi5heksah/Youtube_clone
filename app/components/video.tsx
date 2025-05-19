import { Link } from "@remix-run/react";

interface VideoProps {
  video: any;
}

export default function Video({ video }: VideoProps) {
  const videoId = video.id?.videoId || video.id;
  const { publishedAt, title, description, thumbnails, channelTitle } = video.snippet;

  return (
    <div className="flex flex-col p-4 border rounded-md shadow-sm hover:shadow-md transition duration-200">
      <Link to={`/video/${videoId}`}>
        <div className="h-48 md:h-56 rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover rounded"
            src={thumbnails?.high?.url || thumbnails?.default?.url}
            alt={title}
          />
        </div>
    
    {/* channel logo */}
        <div className="flex h-9 w-9 rounded-full overflow-hidden border"> 
            <img className="h-full w-full rounded-full overflow-hidden" src={thumbnails?.default?.url} alt={channelTitle} />
        </div>
        <div className="mt-2">
          <h3 className="text-md text-black font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <p className="text-xs text-gray-400 mt-1">Channel: {channelTitle}</p>
          <p className="text-xs text-gray-400 mt-1">Release Time: {publishedAt}</p>

        </div>
      </Link>
    </div>
  );
}
