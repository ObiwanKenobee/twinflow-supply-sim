
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Define the user roles
export type UserRole = "Supplier" | "SME" | "Auditor" | "Admin" | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock users for demonstration
  const mockUsers: User[] = [
    { id: "1", email: "supplier@example.com", name: "Supplier User", role: "Supplier" },
    { id: "2", email: "sme@example.com", name: "SME User", role: "SME" },
    { id: "3", email: "auditor@example.com", name: "Auditor User", role: "Auditor" },
    { id: "4", email: "admin@example.com", name: "Admin User", role: "Admin" },
  ];

  useEffect(() => {
    // Check for stored user in localStorage on initial load
    const storedUser = localStorage.getItem("twinchain_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication - in a real app, this would call an API
      const foundUser = mockUsers.find(u => u.email === email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (foundUser && password === "password") { // Simple password for demo
        setUser(foundUser);
        localStorage.setItem("twinchain_user", JSON.stringify(foundUser));
        navigate("/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    try {
      // In a real app, this would call an API to create a new user
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        role,
      };
      
      setUser(newUser);
      localStorage.setItem("twinchain_user", JSON.stringify(newUser));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("twinchain_user");
    navigate("/login");
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 800));
      // Just simulate success
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
