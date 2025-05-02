
import { UserRole } from "@/auth/AuthContext";

// Mock API endpoints for admin features

interface AdminStats {
  userCount: number;
  userGrowth: number;
  supplyChainCount: number;
  supplyChainGrowth: number;
  riskAlerts: number;
  riskAlertsChange: number;
  aiPrompts: number;
  aiPromptsGrowth: number;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

// Fetch admin dashboard stats
export const fetchAdminStats = async (): Promise<AdminStats> => {
  console.log("Fetching admin stats");
  
  // Mock response - in a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userCount: 247,
        userGrowth: 12,
        supplyChainCount: 42,
        supplyChainGrowth: 5,
        riskAlerts: 12,
        riskAlertsChange: 3,
        aiPrompts: 124,
        aiPromptsGrowth: 18
      });
    }, 500);
  });
};

// Fetch list of all users
export const fetchUsers = async (): Promise<UserData[]> => {
  console.log("Fetching all users");
  
  // Mock response - in a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "user_1",
          name: "John Smith",
          email: "john@example.com",
          role: "SME",
          status: "active",
          createdAt: "2025-01-15",
          lastLogin: "2025-05-01"
        },
        {
          id: "user_2",
          name: "Maria Rodriguez",
          email: "maria@example.com",
          role: "Supplier",
          status: "active",
          createdAt: "2025-02-10",
          lastLogin: "2025-04-28"
        },
        {
          id: "user_3",
          name: "David Chen",
          email: "david@example.com",
          role: "Auditor",
          status: "active",
          createdAt: "2025-03-05",
          lastLogin: "2025-04-30"
        },
        {
          id: "user_4",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          role: "SME",
          status: "pending",
          createdAt: "2025-04-20"
        },
        {
          id: "user_5",
          name: "Michael Brown",
          email: "michael@example.com",
          role: "Supplier",
          status: "suspended",
          createdAt: "2025-01-25",
          lastLogin: "2025-03-15"
        },
        {
          id: "user_6",
          name: "Admin User",
          email: "admin@example.com",
          role: "Admin",
          status: "active",
          createdAt: "2024-12-01",
          lastLogin: "2025-05-02"
        }
      ]);
    }, 500);
  });
};

// Update user role
export const updateUserRole = async (userId: string, role: UserRole): Promise<UserData> => {
  console.log(`Updating user ${userId} role to ${role}`);
  
  // Mock response - in a real app, this would update via an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "User Name",
        email: "user@example.com",
        role: role,
        status: 'active',
        createdAt: "2025-01-01",
        lastLogin: "2025-05-01"
      });
    }, 800);
  });
};

// Update user status
export const updateUserStatus = async (userId: string, status: 'active' | 'pending' | 'suspended'): Promise<UserData> => {
  console.log(`Updating user ${userId} status to ${status}`);
  
  // Mock response - in a real app, this would update via an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "User Name",
        email: "user@example.com",
        role: "SME",
        status: status,
        createdAt: "2025-01-01",
        lastLogin: status === 'active' ? "2025-05-01" : undefined
      });
    }, 800);
  });
};

// Delete user
export const deleteUser = async (userId: string): Promise<void> => {
  console.log(`Deleting user ${userId}`);
  
  // Mock response - in a real app, this would delete via an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
};
