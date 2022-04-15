import { Settings } from '../Settings';
import { Container, Grid, Paper  } from '@mui/material';
import { hostname } from 'os';
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { DateTime } from 'luxon';
import StockAPI from '../api_client/StockAPI';
import BasePlotlyChart from '../components/charts/plotly/BasePlotlyChart';
import TimeseriesChart from '../components/charts/recharts/TimeseriesChart';
import HeaderSideMenu from '../layouts/HeaderSideMenu';
import { rclSignOut, rclStateAuth } from '../states/States';
import StockpriceVolumeChart from '../components/charts/recharts/StockpriceVolumeChart';


interface Props {};

const now = DateTime.local();
const MAX_DATA_COUNT = 100;
const timeData = [...Array(MAX_DATA_COUNT)].map((_, i) => {
  return {
    timestamp: now.plus({ second: i }).toFormat('y/MM/dd HH:mm:ss'),
    value: Math.random(),
    value2: Math.random(),
  };
});

const DashBoard: React.FC<Props> = (props: Props) => {
  const authState = useRecoilValue(rclStateAuth);
  console.log("DashBoard")
  const apiCall = () => {
    const api = new StockAPI(
      Settings.BACKEND_APISERVER_HOST,
      Settings.BACKEND_APISERVER_PORT
    )
    api.getCompanyList()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div>
      <HeaderSideMenu subtitle='Dash Board'/>
      <Container
        maxWidth='lg'
        style={{margin: "10vh 0px 0px 10vw", padding: "0px 0px 0px 0px", minHeight: '100vh'}}
      >
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={10} md={10} lg={10}>
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 5px 0px 0px", height: 500, maxHeight: '100vh', overflow: 'auto'}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              {/* <TimeseriesChart
                data={timeData}
                xKey="timestamp"
                lineDataKeys={["value"]}
                barDataKeys={["value2"]}
                width={800}
                height={500}
              /> */}
              <StockpriceVolumeChart
                data={timeData}
                datetimeKey="timestamp"
                stockpriceKey="value"
                volumeKey="value2"
                width={800}
                height={500}
              />
            </Paper>
          </Grid>
          <Grid item xs={2} md={2} lg={2} >
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "0px 0px 0px 5px", height: 500}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              <button onClick={apiCall}>api</button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12} >
            <Paper
              elevation={3}
              style={{padding: "10px", margin: "10px 0px 0px 0px", height: 300}}
              sx={{ border: 5, borderColor: 'primary.main', backgroundColor: 'primary.main' }}
            >
              <BasePlotlyChart
                data={
                  [
                    {
                      x: [1, 2, 3],
                      y: [2, 6, 3],
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: {color: 'red'},
                    },
                    {
                      x: [1, 2, 3],
                      y: [2, 5, 3],
                      type: 'bar',
                    },
                  ]
                }
                width={600} height={300}
              ></BasePlotlyChart>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
};

export default DashBoard;
