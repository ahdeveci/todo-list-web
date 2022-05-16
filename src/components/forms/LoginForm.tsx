import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {UserModel} from "../../data/models/user.model";
import {ChangeEvent, useEffect, useState} from "react";
import useUserActions from "../../data/actions/user.actions";

const user: UserModel = {
    email: '',
    password: '',
    isProcessing: false,
    emailValid: false,
    passwordValid: false,
    hasError: false
}

interface OwnProps {
    loginFormHandler: any;
}

const LoginForm: React.FC<OwnProps> = ({loginFormHandler}: OwnProps) => {
    const [loginData, setLoginData] = useState<UserModel>(user);
    const userActions = useUserActions();

    const inputChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        console.log('event=>', event.target.checkValidity());
        setLoginData({...loginData, [event.target.name]: event.target.value, [event.target.name + 'Valid']: event.target.checkValidity()});
    }

    useEffect(() => {
        console.log('logindata=>', loginData);
    }, [loginData]);

    const submitForm = (event: any) => {
        event.preventDefault();
        if (loginData.emailValid && loginData.passwordValid) {
            userActions.login(loginData.email, loginData.password).then(result => {

            }).catch(err => {

            })
        } else {
            setLoginData({...loginData, hasError: true});
        }
    }

    const openRegisterForm = () => {
        loginFormHandler(false);
    }

    return <Grid container>
        <Box sx={{margin: 'auto', width: '100%'}}>
            <form onSubmit={submitForm}>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                    Please Sign In
                </Typography>
                <TextField
                    sx={{mt: 4, width: '100%'}}
                    required
                    id="outlined-required"
                    label="E-mail Address"
                    type="email"
                    fullWidth={true}
                    name="email"
                    error={!!!loginData.emailValid && !!loginData.hasError }
                    onChange={inputChangeHandler}
                />
                <TextField
                    sx={{mt: 2, width: '100%'}}
                    required
                    id="outlined-required"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth={true}
                    error={!!!loginData.passwordValid && !!loginData.hasError }
                    onChange={inputChangeHandler}
                />
                <Button type="submit" sx={{width: '100%', mt: 4}} variant="contained">Submit</Button>
                <Button type="button" sx={{width: '100%', mt: 2}} variant="outlined" onClick={openRegisterForm}>Register</Button>
            </form>
        </Box>
    </Grid>
}

export default LoginForm;