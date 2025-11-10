import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import DashboardAdmin from "../components/dashboard/DashboardAdmin.jsx";
import DashboardTeacher from "../components/dashboard/DashboardTeacher.jsx";
import DashboardStudent from "../components/dashboard/DashboardStudent.jsx";
import DashboardRegular from "../components/dashboard/DashboardRegular.jsx";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            {user?.role === "ADMIN" && <DashboardAdmin />}
            {user?.role === "TEACHER" && <DashboardTeacher />}
            {user?.role === "STUDENT" && <DashboardStudent />}
            {user?.role === "REGULAR" && <DashboardRegular />}
        </DashboardLayout>
    );
}
