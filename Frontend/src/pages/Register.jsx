import { useState } from "react";
import { register as registerApi} from "../api/auth";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Link,
    Avatar,
    Grid,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {useAuth} from "../context/AuthContext.jsx";

export default function Register() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        } else if (formData.email.length > 100) {
            newErrors.email = "Email is too long (max 100 characters)";
        }

        // Username
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        } else if (formData.username.length > 30) {
            newErrors.username = "Username cannot exceed 30 characters";
        }

        // Password
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (formData.password.length > 64) {
            newErrors.password = "Password cannot exceed 64 characters";
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Password must include at least one uppercase letter";
        } else if (!/\d/.test(formData.password)) {
            newErrors.password = "Password must include at least one number";
        }

        // Confirm password
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const data = await registerApi(formData.email, formData.username, formData.password);
            login(data);
            window.location.href = "/dashboard";
        } catch (err) {
            setErrors({ form: "Registration failed. Try again later." });
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #2e7d32 0%, #43a047 50%, #81c784 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper
                            elevation={8}
                            sx={{
                                p: { xs: 4, md: 6 },
                                borderRadius: 4,
                                backdropFilter: "blur(6px)",
                            }}
                        >
                            <Box sx={{ textAlign: "center", mb: 3 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: "success.main",
                                        width: 64,
                                        height: 64,
                                        m: "0 auto",
                                        mb: 2,
                                    }}
                                >
                                    <PersonAddAlt1Icon fontSize="large" />
                                </Avatar>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: 700, color: "text.primary" }}
                                >
                                    Create an Account
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                    Fill out your details below to get started.
                                </Typography>
                            </Box>

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                />

                                {errors.form && (
                                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                        {errors.form}
                                    </Typography>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                    }}
                                >
                                    Register
                                </Button>

                                <Typography variant="body2" sx={{ textAlign: "center" }}>
                                    Already have an account?{" "}
                                    <Link href="/login" underline="hover" fontWeight={600}>
                                        Login here
                                    </Link>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
