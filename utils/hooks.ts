import { useQuery } from "@tanstack/react-query";

export const useProductQuery = <T>(apiFunction: (...args: Array<unknown>) => Promise<T>, queryKey: string, ...rest: Array<unknown>) => { // Abstracted this functionality to avoid repeating the same pattern in multiple functions
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: [queryKey, ...rest],
    queryFn: () => apiFunction(...rest),
    staleTime: 30000, // can be set to infinity to prevent data from going stale
    gcTime: 300000, // can be set to infinity to prevent data from being garbage collected
    refetchOnWindowFocus: false
  });

  return { isLoading, data: data as T, error, isSuccess }
}