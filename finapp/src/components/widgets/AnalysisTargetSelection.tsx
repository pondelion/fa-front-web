import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react'
import { useRecoilState } from 'recoil';
import { rclStateAnalysisTarget } from '../../states/States';

interface Props {};

const AnalysisTargetSelection: React.FC<Props> = (props: Props) => {
  const [analysisTarget, setAnalysisTarget] = useRecoilState(rclStateAnalysisTarget);

  return (
    <div>
      <FormControl>
        <InputLabel id="analysis-target-label" sx={{backgroundColor: "primary.light", color: "secondary.dark"}}>Target</InputLabel>
        <Select
          labelId="analysis-target-label"
          id="analysis-target-select"
          value={analysisTarget}
          label="Target"
          color="secondary"
          // variant="outlined"
          sx={{backgroundColor: "primary.light", color: "secondary.dark"}}
          onChange={(e: SelectChangeEvent) => {setAnalysisTarget(e.target.value as any)}}
        >
          <MenuItem value={"STOCK"} >Stock Mode</MenuItem>
          <MenuItem value={"CRYPTO"}>Crypto Mode</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
};

export default AnalysisTargetSelection;
