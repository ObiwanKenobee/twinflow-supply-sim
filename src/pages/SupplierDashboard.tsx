
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/auth/AuthContext";
import { BarChart2, FileText, Mic, Plus, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchSupplierOperations, deleteOperation } from "@/services/supplierApi";

interface Operation {
  id: string;
  name: string;
  description: string;
  location: string;
  workers: number;
  riskLevel: string;
  createdAt: string;
}

export default function SupplierDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [operations, setOperations] = useState<Operation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOperations();
  }, []);

  const loadOperations = async () => {
    try {
      setLoading(true);
      const data = await fetchSupplierOperations();
      setOperations(data);
    } catch (error) {
      console.error("Error loading operations:", error);
      toast({
        title: "Error",
        description: "Failed to load your operations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOperation = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this operation?")) {
      return;
    }
    
    try {
      await deleteOperation(id);
      toast({
        title: "Success",
        description: "Operation deleted successfully",
      });
      // Refresh the list
      loadOperations();
    } catch (error) {
      console.error("Error deleting operation:", error);
      toast({
        title: "Error",
        description: "Failed to delete operation",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout title="Supplier Dashboard">
      <Tabs defaultValue="operations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="operations">My Operations</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="operations">
          <div className="grid gap-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">My Operations</h2>
                <Link to="/supplier/upload">
                  <Button size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" /> Add Operation
                  </Button>
                </Link>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : operations.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {operations.map((operation) => (
                    <Card key={operation.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{operation.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground mb-4">
                          <p>{operation.description}</p>
                          <p className="mt-1">Location: {operation.location}</p>
                          <p className="mt-1">Workers: {operation.workers}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full ${
                              operation.riskLevel === 'high' ? 'bg-red-500' : 
                              operation.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            } mr-1`}></div>
                            <span className="text-xs capitalize">{operation.riskLevel} Risk</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteOperation(operation.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="border-dashed cursor-pointer hover:bg-muted/5 transition-colors">
                    <Link to="/supplier/upload">
                      <CardContent className="flex flex-col items-center justify-center h-full py-8">
                        <div className="rounded-full bg-primary/10 p-3 mb-4">
                          <Plus className="h-6 w-6" />
                        </div>
                        <p className="font-medium">Add New Operation</p>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          Describe your manufacturing or supply process
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <Plus className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Operations Added Yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Add your first manufacturing or supply operation to start generating insights
                    </p>
                    <Link to="/supplier/upload">
                      <Button>Add Your First Operation</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid gap-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Compliance Documents</h2>
                <Button size="sm" className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Upload Document
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Labor Policy</h3>
                        <p className="text-sm text-muted-foreground">Uploaded 2 weeks ago</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <Mic className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Worker Interview</h3>
                        <p className="text-sm text-muted-foreground">Uploaded 5 days ago</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">Play</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid gap-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Labor Insights</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Wage Compliance</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Working Hours</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Safety Standards</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Improvement Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-yellow-600 text-xs">!</span>
                        </div>
                        <span>Reduce overtime hours by implementing shift rotation system</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span>Continue good practices for wage compliance documentation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span>Safety protocols are well implemented - maintain regular drills</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
