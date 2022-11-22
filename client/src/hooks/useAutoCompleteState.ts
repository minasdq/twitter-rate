import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import useDebounce from 'Hooks/useDebounce';

import axios from 'Configs/axios';

import { UsersResponse, User } from 'Types/api';

const useAutoCompleteState = (
  query: string,
  setQuery: (value: string) => void,
  setState: (options: User[]) => void,
) => {
  const debouncedQuery = useDebounce(query, 300);

  const {
    isLoading,
    isError,
    data: usernameList,
  } = useQuery<AxiosResponse<UsersResponse>>({
    queryKey: ['getUsers', debouncedQuery],
    queryFn: () => axios.get(`get/users/${debouncedQuery}`),
    enabled: !!debouncedQuery,
    onSuccess: (response) => {
      setState(response.data?.body || []);
    },
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
