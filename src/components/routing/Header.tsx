import {
    AppBar,
    Box, Button,
    FormControlLabel,
    FormGroup,
    IconButton,
    Menu,
    MenuItem, styled,
    Switch, ToggleButton, ToggleButtonGroup,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle, LogoutOutlined} from "@mui/icons-material";

import {useRecoilValue} from "recoil";
import {authAtom} from "../../states/auth.atom";
import {MouseEventHandler, useState} from "react";
import SwipeableTemporaryDrawer from "./Drawer";
import {useNavigate} from "react-router-dom";
import useUserActions from "../../data/actions/user.actions";

const TopMenuWrapper = styled(Box)(
    ({ theme }) => `
     @media (max-width: 550px) {
            display: none
     }
`
);

const pages = [
    {link: 'active-todo-list', title: 'Active To Do List'},
    {link: 'completed-todo-list', title: 'Completed To Do List'},
    {link: 'group-management', title: 'Group Management'},
];

const Header: React.FC = () => {
    const auth = useRecoilValue(authAtom);
    const navigate = useNavigate();
    const userActions = useUserActions();

    const menuClickHandle = (page: any) => {
        navigate(page.link);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <SwipeableTemporaryDrawer/>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button onClick={() => menuClickHandle(page)}
                                key={page.link}
                                sx={{ my: 2, ml: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    {auth && (
                        <div>
                            <IconButton sx={{ flexGrow: 0,  display: { xs: 'none', md: 'block' } }}
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() => userActions.logout()}
                            >
                                <LogoutOutlined/>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;