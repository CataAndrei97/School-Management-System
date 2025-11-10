import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function DashboardRegular() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Welcome, and thank you for registering. Your role will be assigned by an administrator shortly.</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
