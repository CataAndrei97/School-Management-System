import { Box, CircularProgress, Typography } from "@mui/material";

export default function AuthLoader() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background:
                    "linear-gradient(135deg, #2e7d32 0%, #43a047 50%, #81c784 100%)",
                color: "white",
            }}
        >
            <CircularProgress size={70} thickness={5} sx={{ mb: 3, color: "white" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Checking your session...
            </Typography>
        </Box>
    );
}
