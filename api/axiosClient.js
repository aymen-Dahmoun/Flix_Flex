

import axios from "axios";
import Constants from "expo-constants"

const apiKey = Constants.expoConfig?.extra?.TMDB_API_KEY;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: apiKey },
});
