import { useQuery } from '@tanstack/react-query';

import useDebounce from 'Hooks/useDebounce';

import axios from 'Configs/axios';

const useAutoCompleteState = (query: string, setQuery: (value: string) => void) => {
  const debouncedQuery = useDebounce(query, 300);

  const {
    isLoading,
    isError,
    data: usernameList,
  } = useQuery({
    queryKey: ['getUsers', debouncedQuery],
    queryFn: () => axios.get(`getUsers/${debouncedQuery}`),
    enabled: !!debouncedQuery,
  });

  return ({
    isLoading,
    isError,
    usernameList,
    query,
    setQuery,
  });
};

export default useAutoCompleteState;
