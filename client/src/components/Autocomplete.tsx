import { ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Autocomplete as MuiAutocomplete, CircularProgress, InputAdornment, TextField, Theme,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { AtSymbolIcon } from '@heroicons/react/outline';

import useDebounce from 'Hooks/useDebounce';

import axios from 'Configs/axios';

interface AutocompleteProps {
  username: string,
  setUsername: (value: string) => void
}

const useStyles = makeStyles()((theme: Theme) => ({
  autocomplete: {
    margin: 'auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    color: theme.palette.grey[600],
  },
}));

const Autocomplete = ({
  username, setUsername,
}: AutocompleteProps) => {
  const { classes } = useStyles();
  const debouncedValue = useDebounce(username, 300);

  const {
    data: usernameList, isStale: isUsernameListStale,
    isLoading: isUsernameListLoading,
  } = useQuery({
    queryKey: ['getUsers', debouncedValue],
    queryFn: () => axios.get(`getUsers/${debouncedValue}`),
    enabled: false,
  });

  const handleAutoCompleteChanges = (event: ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    setUsername(event.target.value);
  };

  return (
    <MuiAutocomplete
      fullWidth
      className={classes.autocomplete}
      freeSolo={isUsernameListStale}
      filterOptions={(filterOptions) => filterOptions}
      options={usernameList?.data.body?.data || []}
      renderInput={
        (params) => (
          <TextField
            {...params}
            autoFocus
            margin="dense"
            onChange={handleAutoCompleteChanges}
            value={username}
            placeholder="Search username ..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <AtSymbolIcon className={classes.icon} />
                </InputAdornment>
              ),
              ...(isUsernameListLoading && {
                endAdornment: (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                ),
              }),
            }}
          />
        )
      }
    />
  );
};
export default Autocomplete;
