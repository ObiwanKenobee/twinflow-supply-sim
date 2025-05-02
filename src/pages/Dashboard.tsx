
import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import SMEDashboard from "@/dashboards/SME";
import SupplierDashboard from "@/dashboards/Supplier";
import AuditorDashboard from "@/dashboards/Auditor";
import AdminDashboard from "@/dashboards/Admin";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case "SME":
      return <SMEDashboard />;
    case "Supplier":
      return <SupplierDashboard />;
    case "Auditor":
      return <AuditorDashboard />;
    case "Admin":
      return <AdminDashboard />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
}
