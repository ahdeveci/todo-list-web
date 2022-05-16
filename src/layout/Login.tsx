import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {ChangeEvent, FormEventHandler, useEffect, useState} from "react";
import {UserModel} from "../data/models/user.model";
import LoginForm from "../components/forms/LoginForm";
import RegistrationForm from "../components/forms/RegistrationForm";



const Login: React.FC = () => {

    const [isSignIn, setIsSignIn] = useState(true);

    const registrationFormHandler = (event: any) => {
        console.log('event=>', event);
        setIsSignIn(event);
    }

    const loginFormHandler = (event: any) => {
        console.log('login event=>', event);
        setIsSignIn(event);
    }

    return (
        <Paper
            sx={{
                p: 3,
                margin: 'auto',
                marginTop: '25%',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            {
                isSignIn ?
                <LoginForm loginFormHandler={loginFormHandler}/>
                :
                <RegistrationForm registrationHandler={registrationFormHandler}/>

            }
        </Paper>
        );
}

export default Login;