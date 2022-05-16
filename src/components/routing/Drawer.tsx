import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import {IconButton} from "@mui/material";
import {
    CheckCircleOutlineOutlined,
    GroupsOutlined,
    LogoutOutlined,
    NotificationsActiveOutlined
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const pages = [
    {link: 'active-todo-list', title: 'Active To Do List'},
    {link: 'completed-todo-list', title: 'Completed To Do List'},
    {link: 'group-management', title: 'Group Management'},
];


export default function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };
    const navigate = useNavigate();

    const menuClickHandle = (page: any) => {
        console.log(page);
        navigate(page.link);
    }

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {pages.map((page, index) => (
                    <ListItem key={page.link} disablePadding onClick={() => menuClickHandle(page)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {index === 0 ? <NotificationsActiveOutlined/> :
                                index === 1 ? <CheckCircleOutlineOutlined/>:
                                            <GroupsOutlined/>}
                            </ListItemIcon>
                            <ListItemText primary={page.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>

                    <ListItem  disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} />
                        </ListItemButton>
                    </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
                <React.Fragment>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                        onClick={toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                    >
                        {list('left')}
                    </SwipeableDrawer>
                </React.Fragment>
        </div>
    );
}
