import { makeStyles } from "@material-ui/core/styles";
import { NavLink, Outlet } from "react-router-dom";
import React, { useState,useEffect } from "react";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import Logo from "../image/stellar.svg";
import Settingsicon from "../image/settings.svg";
import { Avatar, Layout,Dropdown, } from 'antd';
import {AppBar, Toolbar, Typography, CssBaseline, Link, Button,} from "@material-ui/core";
import { Icon } from "@ant-design/icons";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { UserOutlined } from '@ant-design/icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';







const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor:"fff#;"
    
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    padding:5,
    flexGrow: 1,
  },
}));


  



const token = sessionStorage.getItem("access_token") || false;

function Header() {
  const classes = useStyles();


  const [loginuser,setLoginUser]=useState([{ id: "", user_name: "" }])

  const loginuserApi = async () => {
    try {
      const result = await axios.get("/loginuser");
      console.log(result.data.data)
      setLoginUser(result.data?.data);

    } catch (error) {
      console.log(error);
    }
  };


  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  
    setOpen(false);
  };
  
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
  
    prevOpen.current = open;
  }, [open]);
  



  useEffect(() => {
    // loginuserApi();
    
  }, [1]);

const admin_control=JSON.parse(sessionStorage.getItem("user_details"))?.is_staff
console.log(admin_control)

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        
        <Toolbar className={classes.toolbar}>
        <img src={Logo}/> 
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
          
            <Link
              component={NavLink}
              to="/"
              underline="none"
              color="textPrimary"
            >
              DashBoard
            </Link>
         
          </Typography>
          {/* <nav>
            {token ? (
              <>
                <Link
                  color="textPrimary"
                  href="#"
                  className={"text-decoration-none ms-2"}
                  component={NavLink}
                  to="/"
                >
                  Activity
                </Link>
                
              </>

            ) : (
              <Link
                color="textPrimary"
                href="#"
                className={"text-decoration-none ms-2"}
                component={NavLink}
                to="/register"
              >
                User Registration
              </Link>
            )}
          </nav> */}
          {/* {!token ? (
            <NavLink to={"/login"}>
              <Button href="#" color="primary" variant="outlined">
                Login
              </Button>
            </NavLink>
          ) : ( */}
            <>
           
           

           <Stack direction="row" spacing={2}>
   
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <div class="div mx-1">
          <span> {JSON.parse(sessionStorage.getItem("user_details"))?.user_name}</span>
           </div>
           
       
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    Profile</MenuItem>
                  <MenuItem  onClick={() => {
                sessionStorage.clear();
                window.location.href = "/login";
              }}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  </Stack>


           {admin_control &&
           <Link
                  color="textPrimary"
                  href="#"
                  className={"text-decoration-none ms-2 me-2"}
                  component={NavLink}
                  to="/dashboard"
                >
                   <img src={Settingsicon}/> 
                </Link> 
             }  
           

           
             {/* <Button className="mx-2"
              href="#"
              color="secondary"
              variant="contained"
              size="small"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Logout
            </Button> */}
            </>
            
           
            
          {/* )} */}
        </Toolbar>
      </AppBar>
      <div class="mt-5">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default Header;
