import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function DashboardStudent() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Overall average</Typography>
                        <Typography variant="h4">9.23</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Next test</Typography>
                        <Typography variant="h4">Mathematics - November 3</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
