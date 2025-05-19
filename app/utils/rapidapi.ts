import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;  

//google api
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

interface FetchYoutubeDataResponse {
   items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: {
        default: { url: string };
        high: { url: string };
      };
    };
  }>;
}

export const fetchYoutubeData = async (query: string): Promise<FetchYoutubeDataResponse> => {
     try {
        console.log("Fetching data with query:", query);
        
    const response = await axios.get<FetchYoutubeDataResponse>(BASE_URL, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
        key: API_KEY,
      },
    });
    console.log("Api response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from YouTube API:", error);
    throw error;
  }
};