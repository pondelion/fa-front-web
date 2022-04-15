import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import MaterialTable from 'material-table';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useNavigate } from "react-router-dom";

interface Props {
  data: any
};

const CompanyListTable: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const columns = [
    { title: 'Code', field: 'code', type: 'numeric' },
    { title: 'Company Name', field: 'name' },
    { title: 'Sector', field: 'sector_name' },
  ]

  return (
    <div>
        <MaterialTable
          columns={columns as any}
          data={props.data}
          actions={[
            {
              icon: () => { return (<AccountBoxOutlinedIcon/>)},
              tooltip: 'See Company Details',
              onClick: (event, rowData: any) => { navigate(`/company_profile/${rowData.code}`, { replace: true }); }
            }
          ]}
          title="Company List"
        />
    </div>
  )
};

export default CompanyListTable;
