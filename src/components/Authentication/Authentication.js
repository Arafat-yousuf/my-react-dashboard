import React, { useState } from 'react';
import './Authentication.css';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
//import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import Typography from '@material-ui/core/Typography';
import { makeStyles, Tabs, Tab } from '@material-ui/core';
import BackImage from '../../Images/login.png'
import { useAuth } from './useAuth';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(' + BackImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(10, 4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        width: 'auto',
        margin: theme.spacing(3, 0, 2),
        textAlign: 'center',
    },
    title: {
        fontSize: '3rem',
        textAlign: 'center',
        width: '50%',
        fontWeight: '400'
    },
    loginPanel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    switch: {
        margin: theme.spacing(0, 3),
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none',
        },

    },
}));

const Authentication = () => {
    const classes = useStyles();
    const [newUser, setNewUser] = useState(0);
    const handleUser = (event, newValue) => {
        setNewUser(newValue);
    };

    const auth = useAuth();
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => { 
        if(newUser===0){
            if(data.email && data.password){
                auth.signIn(data.email, data.password);
            }
        }else{
            if(data.name && data.email && data.password && data.confirm_password &&(data.password===data.confirm_password)){
                auth.signUp(data.email, data.confirm_password,data.name)
            }
        }
        
     }
    console.log(newUser);
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>

                    <Tabs indicatorColor="primary" value={newUser} onChange={handleUser} >
                        <Tab label="LOGIN" />
                        <Tab label="NEW USER" />
                    </Tabs>
                    <h1 className={classes.title}>Welcome To Dashboard</h1>
                    {newUser === 0 ?
                        <div className={classes.loginPanel}>
                            <Button
                                variant="contained"
                                color="default" >
                                Sign in with Google
                            </Button>
                            <h3>or</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    ref={register({ required: true })}
                                    autoFocus
                                />
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    ref={register({ required: true })}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>


                                <Link className={classes.switch} variant="body2">
                                    Forgot password?
                                </Link>


                            </form>
                        </div>
                        :
                        <form className={classes.form}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoFocus
                                    ref={register({ required: true })}
                                />
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="newEmail"
                                    label="Email Address"
                                    name="newEmail"
                                    
                                    ref={register({ required: true })}
                                />
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newPassword"
                                    label="Password"
                                    type="password"
                                    id="newPassword"
                                    
                                    ref={register({ required: true })}
                                />
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    ref={register({ required: true })}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Create Account
                                </Button>

                                <Link onClick ={() => setNewUser(0)} className={classes.switch} variant="body2">
                                    <br/>
                                    Already Have an Account?
                                </Link>
                            </form>
                    }

                </div>
            </Grid>
        </Grid>
    );
};

export default Authentication;