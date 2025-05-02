import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Check, 
  Eye, 
  Filter, 
  Loader2, 
  Lock, 
  PlusCircle, 
  Search, 
  UserCheck, 
  UserX,
  User
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchUsers, updateUserStatus, updateUserRole } from "@/services/adminApi";
import { UserRole } from "@/auth/AuthContext";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export default function UserManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<UserRole | null>(null);
  const [newStatus, setNewStatus] = useState<'active' | 'pending' | 'suspended' | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, roleFilter, statusFilter, users]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(filtered);
  };

  const handleStatusChange = async () => {
    if (!selectedUser || !newStatus) return;
    
    try {
      setProcessing(true);
      await updateUserStatus(selectedUser.id, newStatus);
      
      // Update user in state
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          return { ...user, status: newStatus };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      toast({
        title: "Success",
        description: `User status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
      setIsStatusDialogOpen(false);
      setSelectedUser(null);
      setNewStatus(null);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) return;
    
    try {
      setProcessing(true);
      await updateUserRole(selectedUser.id, newRole);
      
      // Update user in state
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          return { ...user, role: newRole };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
      setIsRoleDialogOpen(false);
      setSelectedUser(null);
      setNewRole(null);
    }
  };

  const openStatusDialog = (user: UserData, status: 'active' | 'pending' | 'suspended') => {
    setSelectedUser(user);
    setNewStatus(status);
    setIsStatusDialogOpen(true);
  };

  const openRoleDialog = (user: UserData) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsRoleDialogOpen(true);
  };

  const getRoleBadge = (role: UserRole) => {
    switch(role) {
      case 'Admin':
        return <Badge className="bg-purple-500">Admin</Badge>;
      case 'SME':
        return <Badge className="bg-blue-500">SME/Brand</Badge>;
      case 'Supplier':
        return <Badge className="bg-green-500">Supplier</Badge>;
      case 'Auditor':
        return <Badge className="bg-yellow-500">Auditor</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500">Suspended</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <DashboardLayout title="User Management">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Admin Dashboard
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-1 gap-4">
              <div className="w-full md:w-1/2">
                <Select 
                  value={roleFilter}
                  onValueChange={setRoleFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="SME">SME/Brand</SelectItem>
                    <SelectItem value="Supplier">Supplier</SelectItem>
                    <SelectItem value="Auditor">Auditor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/2">
                <Select 
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline" className="whitespace-nowrap">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
          
          <div className="border rounded-md">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div 
                          className="cursor-pointer hover:opacity-80" 
                          onClick={() => openRoleDialog(user)}
                        >
                          {getRoleBadge(user.role)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="cursor-pointer hover:opacity-80">
                          {getStatusBadge(user.status)}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => openRoleDialog(user)}
                          >
                            <span className="sr-only">Change role</span>
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          {user.status === 'active' ? (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => openStatusDialog(user, 'suspended')}
                            >
                              <span className="sr-only">Suspend</span>
                              <UserX className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => openStatusDialog(user, 'active')}
                            >
                              <span className="sr-only">Activate</span>
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">View details</span>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <UserX className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No users found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  No users match your current filters.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setRoleFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Status Change Dialog */}
      <AlertDialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Status</AlertDialogTitle>
            <AlertDialogDescription>
              {newStatus === 'suspended' 
                ? "Are you sure you want to suspend this user? They will no longer be able to access the platform."
                : "Are you sure you want to activate this user? They will have full access to the platform."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 rounded-md border">
                <div className="bg-primary/10 rounded-full p-2">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleStatusChange();
              }}
              disabled={processing}
              className={newStatus === 'suspended' ? 'bg-destructive hover:bg-destructive/90' : undefined}
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : newStatus === 'suspended' ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Suspend User
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Activate User
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Role Change Dialog */}
      <AlertDialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Role</AlertDialogTitle>
            <AlertDialogDescription>
              Select a new role for this user. This will change what features they can access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedUser && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-md border">
                <div className="bg-primary/10 rounded-full p-2">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Role</label>
                <Select 
                  value={newRole || undefined}
                  onValueChange={(value: UserRole) => setNewRole(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SME">SME/Brand</SelectItem>
                    <SelectItem value="Supplier">Supplier</SelectItem>
                    <SelectItem value="Auditor">Auditor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleRoleChange();
              }}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Change Role
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
