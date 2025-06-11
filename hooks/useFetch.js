import { useState, useEffect } from "react";
import axios from "axios";
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.TMDB_API_KEY;

export default function useFetch(path, params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${path}`,
          {
            params: {
              api_key: apiKey,
              ...params
            },
          }
        );
        setData(response.data.results? response.data.results : response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      } finally {
        setLoading(false);

      }
    };

    fetchData();
  }, [path, JSON.stringify(params)]);


  const result = { data, loading, error };

  return result;
}
