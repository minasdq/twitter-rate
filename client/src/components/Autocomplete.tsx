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

import { User } from 'Types/api';

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
  query: Partial<User>,
  setQuery: (value: Partial<User>) => void
}

const Autocomplete = ({
  query, setQuery,
}: AutoCompleteProps) => {
  const { classes } = useStyles();

  const {
    isLoading,
    usernameList,
    isError,
  } = useAutoCompleteState(query, setQuery);

  return (
    <MuiAutocomplete
      fullWidth
      className={classes.autocomplete}
      options={usernameList?.data?.body || []}
      getOptionLabel={(option) => option.screen_name!}
      onInputChange={(_, value) => setQuery({ screen_name: value })}
      onChange={(_, value) => setQuery(value)}
      value={query}
      filterOptions={(filterOptions) => filterOptions}
      disableClearable
      renderOption={(props, option, { inputValue }) => (
        <AutoCompleteListItem
          {...props}
          name={option.name!}
          username={option.screen_name!}
          avatarSrc={option.profile_image_url!}
          inputValue={inputValue}
        />
      )}
      renderInput={
        (params) => (
          <TextField
            {...params}
            autoFocus
            // onChange={handleAutoCompleteChanges}
            // // value={query}
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
                  <InputAdornment position="end">
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
