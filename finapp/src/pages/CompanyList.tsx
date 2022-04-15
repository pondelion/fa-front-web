import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import HeaderSideMenu from '../layouts/HeaderSideMenu';
import { rclSignOut, rclStateAuth } from '../states/States';
import CompanySearch from '../components/widgets/CompanySearch';
import { Container, Grid, Paper } from '@mui/material';
import CompanyListTable from '../components/widgets/CompanyListTable';
import StockAPI from '../api_client/StockAPI';


interface Props {};

const CompanyList: React.FC<Props> = (props: Props) => {
  const authState = useRecoilValue(rclStateAuth);
  const [companyListData, setCompanyListData] = React.useState<any>([]);
  const [companyListErrMsg, setCompanyListErrMsg] = React.useState<string>("");

  React.useEffect(() => {
    const stockAPI = new StockAPI();
    stockAPI
      .getCompanyList()
      .then((res) => {
        console.log(res);
        setCompanyListData((res.data as any)["company_list"]);
      })
      .catch((err) => {
        console.log(err);
        setCompanyListData([]);
        setCompanyListErrMsg(err);
      })
  }, [setCompanyListData]);

  return (
    <div>
      <HeaderSideMenu subtitle={"Company List"}/>
      <Container
        maxWidth='lg'
        style={{margin: "10vh 0px 0px 10vw", padding: "0px 0px 0px 0px", minHeight: '100vh'}}
      >
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={6} md={6} lg={6}>
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 5px 0px 0px", height: 200, maxHeight: '100vh', overflow: 'auto'}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              <CompanySearch />
            </Paper>
          </Grid>
          <Grid item xs={6} md={6} lg={6} >
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 0px 0px 5px", height: 200, overflow: 'auto'}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12} >
            {`${companyListErrMsg}`}
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "10px 0px 0px 0px", height: 700, overflow: 'auto'}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              {
                companyListData ?
                  <CompanyListTable data={companyListData}/>
                  :
                  <CompanyListTable data={companyListData}/>
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
};

export default CompanyList;
