import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react'

type SerachModeType =  "SELECT_FROM_LIST" | "SEARCH";

interface Props {};

const listSearchWidgets = () => {
  return (
    <div>
      <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
        <Grid item xs={4} md={4} lg={4} sx={{backgroundColor: 'red'}}>
          a
        </Grid>
        <Grid item xs={8} md={8} lg={8} sx={{backgroundColor: 'blue'}}>
          b
        </Grid>
      </Grid>
    </div>
  )
}

const CompanySearch: React.FC<Props> = (props: Props) => {
  const [searchMode, setSearchMode] = React.useState<SerachModeType>("SELECT_FROM_LIST");

  return (
    <div>
      <FormControl>
        <InputLabel id="search-mode-label" sx={{backgroundColor: "primary.light", color: "secondary.dark"}}>Search Mode</InputLabel>
        <Select
          labelId="search-mode-label"
          id="search-mode-select"
          value={searchMode}
          label="Search Mode"
          color="secondary"
          variant="outlined"
          sx={{backgroundColor: "primary.light", color: "secondary.dark"}}
          onChange={(e: SelectChangeEvent) => {setSearchMode(e.target.value as SerachModeType)}}
        >
          <MenuItem value={"SELECT_FROM_LIST"} >Select From List</MenuItem>
          <MenuItem value={"SEARCH"}>Search From Text</MenuItem>
        </Select>
      </FormControl>
      {searchMode === "SELECT_FROM_LIST" ? listSearchWidgets() : ""}
    </div>
  )
};

export default CompanySearch;
