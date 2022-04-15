import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { rclSignOut, rclStateAuth } from '../states/States';

import HeaderSideMenu from '../layouts/HeaderSideMenu';


interface Props {};

const Home: React.FC<Props> = (props: Props) => {
  const authState = useRecoilValue(rclStateAuth);
  const [signedOut, setSignOut] = useRecoilState(rclSignOut);
  return (
    <div>
      <HeaderSideMenu></HeaderSideMenu>
      home
      <div>hello {authState.signedInUsername} : {authState.accessToken}</div>
      <button onClick={() => {setSignOut(true)}}>sign out </button>
    </div>
  )
};

export default Home;
