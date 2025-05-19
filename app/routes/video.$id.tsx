import {useParams} from "@remix-run/react";
import PlayingVideo from "~/components/playingvideo";


export default function Video() {
  const {id} = useParams();
  return (
    <main className="w-full min-h-screen bg-white">
      <PlayingVideo />
    </main>
  );
}

