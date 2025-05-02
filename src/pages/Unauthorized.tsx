
import { Button } from "@/components/ui/button";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  const { user, signOut } = useAuth();

  return (
    <div className="container flex flex-col items-center justify-center h-screen text-center">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 bg-red-500 rounded-md"></div>
        <div className="absolute inset-0 bg-red-700 rounded-md transform rotate-45 scale-75"></div>
      </div>
      <h1 className="text-4xl font-bold mb-2">Access Denied</h1>
      <p className="text-xl text-muted-foreground mb-8">
        You don't have permission to access this page
      </p>
      <div className="space-y-4 max-w-md">
        <p>
          {user
            ? `Your current role (${user.role}) doesn't have the required permissions.`
            : "Please sign in to continue."}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
          <Button onClick={signOut} variant="secondary">Sign Out</Button>
        </div>
      </div>
    </div>
  );
}
