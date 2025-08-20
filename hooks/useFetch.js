import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axiosClient";

export default function useFetch(path, params = {}, options = {}) {
  const fetchData = async () => {
    const response = await api.get(
      `https://api.themoviedb.org/3/${path}`,
      { params }
    );
    return response.data.results ?? response.data;
  };

  return useQuery({
    queryKey: [path, params],
    queryFn: fetchData,
    ...options,
  });
}
