import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function DashboardTeacher() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Managed Classes</Typography>
                        <Typography variant="body1">Class IX A, Class X B</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Subjects Taught</Typography>
                        <Typography variant="body1">Mathematics, Physics</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
