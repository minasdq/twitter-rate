import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';

const Autocomplete = () => (
  <MuiAutocomplete
    fullWidth
    options={[]}
    renderInput={
        (params) => (
          <TextField
            {...params}
            autoFocus
            margin="dense"
            placeholder="Search ..."
          />
        )
    }
  />
);

export default Autocomplete;
