
import Sidebar from './sidebar';
import Video from './video';
import { useAuth } from '~/context/authprovider';

export default function Home() {
  const { data } = useAuth();

  return (
    <div className="flex">
      <Sidebar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
        {data?.map((item: any) => {
          if (item.kind !== 'youtube#searchResult' || item.id.kind !== 'youtube#video') return null;

          return <Video key={item.id.videoId} video={item} />;
        })}
      </div>
    </div>
  );
}
