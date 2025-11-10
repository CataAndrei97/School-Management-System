import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout.jsx";
import DashboardAdmin from "../components/DashboardAdmin.jsx";
import DashboardTeacher from "../components/DashboardTeacher.jsx";
import DashboardStudent from "../components/DashboardStudent.jsx";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            {user?.role === "ADMIN" && <DashboardAdmin />}
            {user?.role === "TEACHER" && <DashboardTeacher />}
            {user?.role === "STUDENT" && <DashboardStudent />}
        </DashboardLayout>
    );
}
