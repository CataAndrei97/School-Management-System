import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as loginApi } from "../api/auth";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Avatar,
    Link,
    Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        } else if (formData.email.length > 100) {
            newErrors.email = "Email is too long (max 100 characters)";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (formData.password.length > 64) {
            newErrors.password = "Password cannot exceed 64 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const data = await loginApi(formData.email, formData.password);
            login(data);
            window.location.href = "/dashboard";
        } catch {
            setServerError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #1565c0 0%, #1e88e5 50%, #90caf9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
            }}
        >
            <Container maxWidth="md">
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
                                        bgcolor: "primary.main",
                                        width: 64,
                                        height: 64,
                                        m: "0 auto",
                                        mb: 2,
                                    }}
                                >
                                    <LockOutlinedIcon fontSize="large" />
                                </Avatar>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ fontWeight: 700, color: "text.primary" }}
                                >
                                    Welcome Back
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                    Log in to your account to continue
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
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />

                                {serverError && (
                                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                        {serverError}
                                    </Typography>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={loading}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                    }}
                                >
                                    {loading ? "Signing in..." : "Sign In"}
                                </Button>

                                <Typography variant="body2" sx={{ textAlign: "center" }}>
                                    Don’t have an account?{" "}
                                    <Link href="/register" underline="hover" fontWeight={600}>
                                        Register here
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
