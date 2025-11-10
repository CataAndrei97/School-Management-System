import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function DashboardAdmin() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Students</Typography>
                        <Typography variant="h4">248</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Teachers</Typography>
                        <Typography variant="h4">35</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Classes</Typography>
                        <Typography variant="h4">12</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
