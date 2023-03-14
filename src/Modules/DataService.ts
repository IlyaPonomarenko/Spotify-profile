import axios, { AxiosInstance } from "axios";
import { create } from "domain";
import { Artist, Track, CurrentTrack, User } from "./Interfaces";

const createAxiosInstance = (token: string): AxiosInstance =>
  axios.create({
    baseURL: "https://api.spotify.com/v1/me",
    headers: { Authorization: `Bearer ${token}` },
  });

const getUserData = async (token: string) => {
  const response = await createAxiosInstance(token).get<User>("");
  return response.data;
};

const getCurrentTrack = async (token: string) => {
  const response = await createAxiosInstance(token).get<CurrentTrack>(
    "/player/currently-playing"
  );
  return response.data;
};

const getTopTracks = async (token: string, timeRange: string) => {
  const response = await createAxiosInstance(token).get<{ items: Track[] }>(
    `/top/tracks?time_range=${timeRange}&limit=10`
  );
  return response.data.items;
};

const getTopArtists = async (token: string, timeRange: string) => {
  const response = await createAxiosInstance(token).get<{ items: Artist[] }>(
    `/top/artists?time_range=${timeRange}&limit=10`
  );
  return response.data.items;
};

// const getArtistInfo = async (token: string, id: string) => {
//   const response = await createAxiosInstance(token).get<{
//     items: ArtistMore[];
//   }>(`/artists/${id}`);

//   return response.data.items;
// };

export {
  getUserData,
  // getArtistInfo,
  getCurrentTrack,
  getTopArtists,
  getTopTracks,
};
