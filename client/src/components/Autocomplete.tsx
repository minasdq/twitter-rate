import { ChangeEvent } from 'react';
import classnames from 'classnames';

import {
  Autocomplete as MuiAutocomplete,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { AtSymbolIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

import AutoCompleteListItem from './AutoCompleteListItem';

import useAutoCompleteState from 'Hooks/useAutoCompleteState';

const useStyles = makeStyles()((theme) => ({
  autocomplete: {
    margin: 'auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  icon: {
    margin: theme.spacing(1),
    width: 25,
    height: 25,
  },
  loadingIcon: {
    color: theme.palette.grey[600],
  },
  errorIcon: {
    color: theme.palette.error.main,
  },
}));

interface AutoCompleteProps {
  query: string,
  setQuery: (value: string) => void
}

const Autocomplete = ({
  query, setQuery,
}: AutoCompleteProps) => {
  const { classes } = useStyles();

  const {
    usernameList,
    isLoading,
    isError,
  } = useAutoCompleteState(query, setQuery);

  const handleAutoCompleteChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <MuiAutocomplete
      fullWidth
      className={classes.autocomplete}
      freeSolo
      options={usernameList?.data?.body || []}
      getOptionLabel={(option: any) => option.screen_name}
      filterOptions={(x) => x}
      renderOption={(props, option, { inputValue }) => (
        <AutoCompleteListItem
          {...props}
          name={option.name}
          username={option.screen_name}
          avatarSrc={option.profile_image_url}
          inputValue={inputValue}
        />
      )}
      renderInput={
        (params) => (
          <TextField
            {...params}
            autoFocus
            onChange={handleAutoCompleteChanges}
            value={query}
            placeholder="Search username ..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="end">
                  <AtSymbolIcon className={classnames(classes.icon, classes.loadingIcon)} />
                </InputAdornment>
              ),
              ...(isLoading && {
                endAdornment: (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                ),
              }),
              ...(isError && {
                endAdornment: (
                  <InputAdornment position="end" className={classes.icon}>
                    <ExclamationCircleIcon
                      className={classnames(classes.icon, classes.errorIcon)}
                    />
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
