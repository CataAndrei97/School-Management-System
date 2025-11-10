import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
} from "@mui/material";
import { Menu as MenuIcon, Logout, Dashboard } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ children }) {
    const [open, setOpen] = useState(false);
    const { logout, user } = useAuth();

    const toggleDrawer = () => setOpen(!open);

    const menuItems = [
        { text: "Dashboard", icon: <Dashboard /> },
        { text: "Logout", icon: <Logout />, action: logout },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {user?.role?.name} Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <Box sx={{ width: 250 }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={item.action || toggleDrawer}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
}
