
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart2, Settings, User, Users, ChartLine, LineChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchAdminStats } from "@/services/adminApi";

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

export default function AdminDashboard() {
  const { toast } = useToast();

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading admin stats:", error);
      toast({
        title: "Error",
        description: "Failed to load platform statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="admin">Administration</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Platform Overview</h2>
                <Button variant="outline" size="sm">
                  <LineChart className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
              </div>
              
              {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardContent className="pt-6">
                        <div className="animate-pulse flex flex-col">
                          <div className="h-4 w-24 bg-muted rounded mb-3"></div>
                          <div className="h-8 w-16 bg-muted rounded mb-2"></div>
                          <div className="h-4 w-20 bg-muted rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-3xl font-bold">{stats?.userCount}</p>
                        <p className={`text-xs ${stats?.userGrowth >= 0 ? 'text-green-500' : 'text-red-500'} mt-1`}>
                          {stats?.userGrowth >= 0 ? '+' : ''}{stats?.userGrowth}% this month
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Active Supply Chains</p>
                        <p className="text-3xl font-bold">{stats?.supplyChainCount}</p>
                        <p className={`text-xs ${stats?.supplyChainGrowth >= 0 ? 'text-green-500' : 'text-red-500'} mt-1`}>
                          {stats?.supplyChainGrowth >= 0 ? '+' : ''}{stats?.supplyChainGrowth}% this month
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Risk Alerts</p>
                        <p className="text-3xl font-bold">{stats?.riskAlerts}</p>
                        <p className={`text-xs ${stats?.riskAlertsChange <= 0 ? 'text-green-500' : 'text-red-500'} mt-1`}>
                          {stats?.riskAlertsChange > 0 ? '+' : ''}{stats?.riskAlertsChange} new today
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">AI Prompts Today</p>
                        <p className="text-3xl font-bold">{stats?.aiPrompts}</p>
                        <p className={`text-xs ${stats?.aiPromptsGrowth >= 0 ? 'text-green-500' : 'text-red-500'} mt-1`}>
                          {stats?.aiPromptsGrowth >= 0 ? '+' : ''}{stats?.aiPromptsGrowth}% this week
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Platform Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="font-medium">New Supply Chain Created</p>
                    <p className="text-sm text-muted-foreground">Tech Solutions Inc. - Electronics Assembly</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <p className="font-medium">Risk Alert Triggered</p>
                    <p className="text-sm text-muted-foreground">Global Textiles Ltd. - Labor Policy Issue</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="font-medium">New User Registration</p>
                    <p className="text-sm text-muted-foreground">Eco Farms Inc. - SME Role</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="admin">
          <div className="grid gap-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Administration</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link to="/admin/users">
                  <Card className="cursor-pointer hover:bg-muted/10 transition-colors h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <div className="bg-primary/10 rounded-lg p-3">
                          <Users className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">User Management</h3>
                          <p className="text-sm text-muted-foreground">Manage platform users</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                
                <Card className="cursor-pointer hover:bg-muted/10 transition-colors h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <Settings className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Prompt Tuner</h3>
                        <p className="text-sm text-muted-foreground">Configure AI prompts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:bg-muted/10 transition-colors h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <BarChart2 className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Analytics</h3>
                        <p className="text-sm text-muted-foreground">Platform usage statistics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:bg-muted/10 transition-colors h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <Settings className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Platform Settings</h3>
                        <p className="text-sm text-muted-foreground">Configure system options</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">System Status</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">API Services</span>
                        <span className="text-sm text-green-500">Online</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Database</span>
                        <span className="text-sm text-green-500">Online</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">AI Services</span>
                        <span className="text-sm text-yellow-500">Degraded</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid gap-6">
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">Chart would display here in production</p>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            <section className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution by Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm">SME/Brand</span>
                        </div>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Supplier</span>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                          <span className="text-sm">Auditor</span>
                        </div>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-sm">Admin</span>
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Low Risk</span>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                          <span className="text-sm">Medium Risk</span>
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-sm">High Risk</span>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
