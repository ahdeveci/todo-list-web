import {RegistrationModel} from "../../data/models/registration.model";
import {ChangeEvent, useEffect, useState} from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import useUserActions from "../../data/actions/user.actions";

const registrationData: RegistrationModel = {
    email: '',
    password: '',
    confirmPassword: '',
    emailValid: false,
    passwordValid: false,
    isProcessing: false,
    hasError: false
}

interface OwnProps {
    registrationHandler: any;
}

const RegistrationForm: React.FC<OwnProps> = ({registrationHandler}: OwnProps) => {

    const userActions = useUserActions();
    const [userData, setUserData] = useState<RegistrationModel>(registrationData);

    const inputChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        console.log('event=>', event.target.checkValidity());
        setUserData({...userData, [event.target.name]: event.target.value, [event.target.name + 'Valid']: event.target.checkValidity()});
    }

    useEffect(() => {
        console.log('logindata=>', userData);
    }, [userData]);

    const submitForm = (event: any) => {
        event.preventDefault();
        if (userData.emailValid && userData.passwordValid) {
            userActions.register(userData).then(registrationResult => {
               console.log('registration result');
            }).catch(err => {
                console.error(err);
            });
        } else {
            setUserData({...userData, hasError: true});
        }
    }

    const returnLogin = () => {
        registrationHandler(true);
    }

    return <Grid container>
        <Box sx={{margin: 'auto', width: '100%'}}>
            <form onSubmit={submitForm}>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                    Please Sign Up
                </Typography>
                <TextField
                    sx={{mt: 4, width: '100%'}}
                    required
                    id="outlined-required"
                    label="E-mail Address"
                    type="email"
                    fullWidth={true}
                    name="email"
                    error={!!!userData.emailValid && !!userData.hasError }
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
                    error={!!!userData.passwordValid && !!userData.hasError }
                    onChange={inputChangeHandler}
                />
                <TextField
                    sx={{mt: 2, width: '100%'}}
                    required
                    id="outlined-required"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    fullWidth={true}
                    error={userData.confirmPassword !== userData.password && !!userData.hasError }
                    onChange={inputChangeHandler}
                />
                <Button type="submit" sx={{width: '100%', mt: 4}} variant="contained">Submit</Button>
                <Button type="button" sx={{width: '100%', mt: 2}} variant="outlined" onClick={returnLogin}>I have already registered</Button>
            </form>
        </Box>
    </Grid>
}

export default RegistrationForm