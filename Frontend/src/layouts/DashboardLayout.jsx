import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
} from "@mui/material";
import { Menu as MenuIcon, Logout, Dashboard, People } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
    const [open, setOpen] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const toggleDrawer = () => setOpen(!open);

    const menuItems = [
        { text: "Dashboard", icon: <Dashboard />, action: () => navigate("/dashboard"), },
    ];

    if (user?.role === "ADMIN") {
        menuItems.push({ text: "Manage Users", icon: <People />, action: () => navigate("/users") });
    }

    menuItems.push({ text: "Logout", icon: <Logout />, action: logout });

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {user?.role} Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <Box sx={{ width: 250 }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItemButton
                                key={item.text}
                                onClick={item.action || toggleDrawer}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
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
