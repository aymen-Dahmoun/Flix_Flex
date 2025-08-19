import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../api/axiosClient";

export default function useInfiniteFetch(path, params = {}, options = {}) {
    async function fetchPaginatedMovies(path, params = {}, pageParam = 1) {
    const response = await api.get(`https://api.themoviedb.org/3/${path}`, {
        params: { ...params, page: pageParam },
    });
    return {
        results: response.data.results ?? [],
        nextPage: pageParam + 1,
        totalPages: response.data.total_pages,
    };
    }

    return useInfiniteQuery({
        queryKey: [path, params],
        queryFn: ({ pageParam = 1 }) =>
        fetchPaginatedMovies(path, params, pageParam),
        getNextPageParam: (lastPage) =>
        lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
        ...options,
    });
}

