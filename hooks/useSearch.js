import axios from "axios";
import { useEffect, useState } from "react";
import Constants from 'expo-constants';
const apiKey = Constants.expoConfig?.extra?.TMDB_API_KEY;

export default function useSearch(query) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setResult([]);
      setLoading(false);
      setErr(null);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      setErr(null);
      
      try {
        const { data } = await axios.get("https://api.themoviedb.org/3/search/multi", {
          params: { 
            query: query.trim(),
            api_key: apiKey
          },
          
        });
        
        setResult(data.results || []);
        setErr(null);
      } catch (error) {
        if (axios.isCancel(error)) return;
        
        console.error('Search error:', error);
        setErr(error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);
  
  return { result, loading, err };
}