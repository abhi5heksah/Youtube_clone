import VideoCard from "./video";

interface VideoListProps {
  videos: any[];
}

export default function VideoList({ videos }: VideoListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id.videoId} video={video} />
      ))}
    </div>
  );
}
