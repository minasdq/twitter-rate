import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import useDebounce from 'Hooks/useDebounce';

import axios from 'Configs/axios';

import { User, UsersResponse } from 'Types/api';

const useAutoCompleteState = (
  query: Partial<User>,
  setQuery: (value: User) => void,
) => {
  const debouncedQuery = useDebounce(query, 300);

  const {
    fetchStatus,
    status,
    isError,
    data: usernameList,
  } = useQuery<AxiosResponse<UsersResponse>>({
    queryKey: ['getUsers', debouncedQuery.screen_name],
    queryFn: () => axios.get(`get/users/${debouncedQuery.screen_name}`),
    enabled: !!debouncedQuery.screen_name,
    keepPreviousData: true,
  });

  return ({
    isLoading: fetchStatus === 'fetching' && status === 'loading',
    isError,
    usernameList,
    query,
    setQuery,
  });
};

export default useAutoCompleteState;
