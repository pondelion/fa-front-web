import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Link  } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { rclSignOut, rclStateAnalysisTarget, rclStateAuth } from '../states/States';
import AnalysisTargetSelection from '../components/widgets/AnalysisTargetSelection';
import { Container } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#222222',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#222222',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const keyName2Icon = (keyName: string) => {
  if (keyName === "company_list") {
    return (
      <BusinessIcon color='secondary'/>
    )
  } else if (keyName === "company_profile") {
    return (
      <AccountBoxOutlinedIcon color='secondary'/>
    )
  } else {
    return (
      <QuestionMarkIcon color='secondary'/>
    )
  }
}

const sideMenuItem = (linkPath: string, keyName: string, text: string, open: boolean) => {
  return (
    <Link to={linkPath} style={{ color: 'inherit', textDecoration: 'inherit'}}>
      <ListItemButton
        key={keyName}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {keyName2Icon(keyName)}
        </ListItemIcon>
        <ListItemText primary={text} color='secondary' sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{color: "secondary"}}/>
      </ListItemButton>
    </Link>
  )
}

interface Props {
  subtitle?: string
};

const HeaderSideMenu: React.FC<Props> = (props: Props) =>  {
  const theme = useTheme();
  const authState = useRecoilValue(rclStateAuth);
  const analysisTarget = useRecoilValue(rclStateAnalysisTarget);
  const [signedOut, setSignOut] = useRecoilState(rclSignOut);
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <AppBar position="static" color='primary'> */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {setOpen(true)}}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit'}}>FinApp {analysisTarget === "STOCK" ? "[Stock]" : "[Crypto]"}</Link>
            {props.subtitle ? ` > ${props.subtitle}` : ""}
          </Typography>
          <AnalysisTargetSelection/>
          <Typography sx={{ m: 1 }}>
            { authState.signedInUsername }
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {if (authState.isSignedIn) {setSignOut(true)}}}>
              {authState.isSignedIn ? 'SIGN OUT' : 'SIGN IN'}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{backgroundColor: 'red'}}>
        <DrawerHeader >
          <IconButton onClick={() => {setOpen(false)}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {
          analysisTarget === "STOCK" ?
            <List>
              {sideMenuItem("/company_list", "company_list", "Company List", open)}
              {sideMenuItem("/company_profile", "company_profile", "Company Profile", open)}
              <Divider />
              {sideMenuItem("/dashboard", "dashboard", "Dashboard", open)}
            </List>
            :
            ""
        }
      </Drawer>
    </Box>
  );
}

export default HeaderSideMenu;
