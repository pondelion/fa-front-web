import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import {
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
//@ts-ignore
import { Service } from 'axios-middleware';
import '../App.css';
import { userPool } from '../aws/Cognito';
import { rclStateAuth, rclStateGuestMode } from '../states/States';


interface Props {};

const SignIn: React.FC<Props> = (props: Props) => {
  const [authState, setAuthState] = useRecoilState(rclStateAuth);
  const [guestMode, setGuestMode] = useRecoilState(rclStateGuestMode);
  const [username, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errMsg, setErrMsg] = React.useState<string>('');
  const changedUserNameHaldler = (e: any) => setUserName(e.target.value);
  const changedPasswordHandler = (e: any) => setPassword(e.target.value);
  const axiosService = new Service(axios);

  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username : username,
      Password : password
    })
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        // login success
        console.log('result: ' + result)
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.idToken.jwtToken;
        console.log('idToken: ' + idToken)
        setErrMsg('');
        setAuthState({
          isSignedIn: true,
          signedInUsername: username,
          accessToken: idToken,
        });
        axiosService.register({
          onRequest(config: any) {
            config.headers['Authorization'] = `Bearer ${idToken}`;
            return config;
          }
        });
      },
      onFailure: (err: any) => {
        console.error(err);
        setErrMsg(err.message);
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{padding: "10px 50px 30px", marginTop: 50, backgroundColor: '#EEEEEE'}}>
        <Grid container justifyContent="center">
          <h1>
            Sign In
          </h1>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="User Name"
            onChange={changedUserNameHaldler}
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="Password"
            onChange={changedPasswordHandler}
          />
          <div style={{marginTop: 20}}>
            <Button variant="contained" color="primary" onClick={signIn}>Sign In</Button>
          </div>
          <div style={{color:'red', fontWeight:'bold', marginTop: 20, fontSize: 14}}>{errMsg}</div>
        </Grid>
        <Grid container justifyContent="center" sx={{mt: 2}}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={
              () => {
                setGuestMode(true);
                setAuthState({ isSignedIn: true, signedInUsername: "GUEST", accessToken: "MOCK_TOKEN"});
              }
            }
          >SIGN IN AS GUEST</Button>
        </Grid>
      </Paper>
    </Container>
  )
}

export default SignIn;