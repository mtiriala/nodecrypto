import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, CircularProgress, Grid } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import useApi from '../../hocks/useApi';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const { data, error, get, post, put, remove } = useApi();
  // const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false)

  const [user, setUser] = React.useState()


  React.useEffect(() => {
    axios.get('/user/curent')
      .then(res => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, []);
  const logout = async () => {
    try {
      let response = await axios.get('logout/');
      console.log(response)
      localStorage.removeItem("token")
      window.location.replace("/login");
    } catch (err) {
      console.error(err)
    }
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout()
    setAnchorEl(null);
  };
  // console.log(data)

  // console.log(JSON.parse(localStorage.getItem('token')))
  if (loading)
    return (<Loading />)
  else
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

            {(user) ? (
              (!loading) ? (
                <>
                  <Grid container>
                    <Grid item xs={6}>
                      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          Dashboard
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid
                      item xs={6}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}>
                      <Button
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <Typography> {user.firstName} {user.lastName}</Typography>
                        <AccountCircle />
                      </Button>
                    </Grid>
                  </Grid>


                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <CircularProgress />
              )
            ) : (<>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                complaint
              </Typography>
              <Link to="/login">
                <Button style={{color : "white"}}>Login</Button>
              </Link>
            </>
            )
            }

          </Toolbar>
        </AppBar>
      </Box>
    );
}

