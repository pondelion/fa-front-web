import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { useParams } from "react-router-dom";
import HeaderSideMenu from '../layouts/HeaderSideMenu';
import { rclSignOut, rclStateAuth } from '../states/States';
import CompanySearch from '../components/widgets/CompanySearch';
import { Container, Grid, Paper } from '@mui/material';
import StockAPI from '../api_client/StockAPI';
import { keyListData2DictListData } from '../utils/DataProcess';
import StockpriceVolumeChart from '../components/charts/recharts/StockpriceVolumeChart';


interface Props {};

const CompanyProfile: React.FC<Props> = (props: Props) => {
  const authState = useRecoilValue(rclStateAuth);
  const [stockpriceData, setStockpriceData] = React.useState<any>(undefined);
  const [stockpriceErrMsg, setStockpriceErrMsg] = React.useState<string>("");
  const { code } = useParams();
  console.log(code);

  React.useEffect(() => {
    if (code) {
      const stockAPI = new StockAPI();
      stockAPI
        .getStockprice(parseInt(code))
        .then((res) => {
          console.log(res);
          const onvertedData = keyListData2DictListData((res.data as any)['stockprice']);
          console.log(onvertedData);
          setStockpriceData(onvertedData.slice(-200, -1));
        })
        .catch((err) => {
          console.log(err);
          setStockpriceData(undefined);
          setStockpriceErrMsg(err);
        })
    }
  }, [setStockpriceData]);

  return (
    <div>
      <HeaderSideMenu subtitle={code ? `Company Profile > ${code}` : 'Company Profile'}/>
      <Container
        maxWidth='lg'
        style={{margin: "10vh 0px 0px 10vw", padding: "0px 0px 0px 0px", minHeight: '100vh'}}
      >
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={6} md={6} lg={6}>
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 5px 0px 0px", height: 300, maxHeight: '100vh', overflow: 'auto'}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              <CompanySearch />
            </Paper>
          </Grid>
          <Grid item xs={6} md={6} lg={6} >
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 0px 0px 5px", height: 300, overflow: 'auto'}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12} >
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "10px 0px 0px 0px", height: 500, overflow: 'auto'}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              {
                stockpriceData ?
                  <StockpriceVolumeChart
                    data={stockpriceData}
                    datetimeKey="date"
                    stockpriceKey="close"
                    volumeKey="volume"
                    width={800}
                    height={500}
                  />
                  :
                  `${stockpriceErrMsg}`
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
};

export default CompanyProfile;
