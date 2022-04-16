import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link  } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import axios from 'axios';
//@ts-ignore
import { Service } from 'axios-middleware';
import { darkBlueTheme, mediumBlueRedTheme, darkWhiteTheme, navyWhiteTheme } from './themes/MaterialUI';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import { userPool } from './aws/Cognito';
import {
  rclStateAccessToken,
  rclStateIsSignedIn,
  rclStateSignedInUsername,
  rclSignOut,
  rclStateAuth,
  rclStateGuestMode,
} from './states/States';
import CompanyList from './pages/CompanyList';
import CompanyProfile from './pages/CompanyProfile';


function App() {
  const [authState, setAuthState] = useRecoilState(rclStateAuth);
  const [signOut, setSignOut] = useRecoilState(rclSignOut);
  const [guestMode, setGuestMode] = useRecoilState(rclStateGuestMode);
  const axiosService = new Service(axios);
  console.log(authState.isSignedIn);
  console.log(authState.signedInUsername);

  useEffect(() => {
    if (!guestMode) {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {  // Already signed in.
        cognitoUser.getSession((err: any, session: any) => {
          if (session.isValid()) {
            setAuthState({
              isSignedIn: true,
              signedInUsername: cognitoUser.getUsername(),
              // accessToken: session.accessToken.jwtToken,
              accessToken: session.idToken.jwtToken,
            });
            axiosService.register({
              onRequest(config: any) {
                config.headers['Authorization'] = `Bearer ${session.idToken.jwtToken}`;
                return config;
              }
            });
          } else {
            setSignOut(true);
            console.log('invalid session');
          }
        });
        console.log('signed in');
      } else {
        setSignOut(true);
        console.log('not signed in');
      }
    }
  }, [authState, guestMode]);

  return (
    <ThemeProvider theme={navyWhiteTheme}>
      <Router basename={process.env.PUBLIC_URL}>
        {console.log(authState.isSignedIn)}
        <Routes >
          <Route path="/" element={authState.isSignedIn ? <Home />: <Navigate to="/signin" replace />} />
        </Routes >
        <Routes >
          <Route path="/signin" element={authState.isSignedIn ? <Navigate to="/" replace /> : <SignIn />} />
        </Routes >
        <Routes >
          <Route path="/dashboard" element={authState.isSignedIn ? <DashBoard />: <Navigate to="/signin" replace />} />
        </Routes >
        <Routes >
          <Route path="/company_list" element={authState.isSignedIn ? <CompanyList />: <Navigate to="/signin" replace />} />
        </Routes >
        <Routes >
          <Route path="/company_profile" element={authState.isSignedIn ? <CompanyProfile />: <Navigate to="/signin" replace />} />
        </Routes >
        <Routes >
          <Route path="/company_profile/:code" element={authState.isSignedIn ? <CompanyProfile />: <Navigate to="/signin" replace />} />
        </Routes >
      </Router>
    </ThemeProvider>
  );
}

export default App;
