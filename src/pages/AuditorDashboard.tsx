
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertTriangle, FileText, Filter, MessageSquare, Search, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchSupplyChainsForAuditor } from "@/services/auditorApi";
import { Badge } from "@/components/ui/badge";

interface SupplyChainForAudit {
  id: string;
  companyName: string;
  description: string;
  industryType: string;
  locations: string[];
  factoryCount: number;
  requestDate: string;
  status: 'pending' | 'flagged' | 'verified' | 'rejected';
}

export default function AuditorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [supplyChains, setSupplyChains] = useState<SupplyChainForAudit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSupplyChains();
  }, []);

  const loadSupplyChains = async () => {
    try {
      setLoading(true);
      const data = await fetchSupplyChainsForAuditor();
      setSupplyChains(data);
    } catch (error) {
      console.error("Error loading supply chains:", error);
      toast({
        title: "Error",
        description: "Failed to load supply chains for review",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewSupplyChain = (id: string) => {
    navigate(`/auditor/note/${id}`);
  };

  // Filter supply chains based on search query
  const filteredSupplyChains = supplyChains.filter(chain => 
    chain.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chain.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chain.industryType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'flagged':
        return <Badge className="bg-red-500">Urgent Review</Badge>;
      case 'verified':
        return <Badge className="bg-green-500">Verified</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-yellow-500">Pending Review</Badge>;
    }
  };

  return (
    <DashboardLayout title="Auditor Dashboard">
      <Tabs defaultValue="review" className="space-y-6">
        <TabsList>
          <TabsTrigger value="review">For Review</TabsTrigger>
          <TabsTrigger value="audits">My Audits</TabsTrigger>
          <TabsTrigger value="tools">Audit Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="review">
          <div className="grid gap-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Supply Chains for Review</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                    <Input 
                      placeholder="Search supply chains..." 
                      className="pl-8 w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button size="sm" variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-1" /> Filter
                  </Button>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredSupplyChains.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSupplyChains.map((chain) => (
                    <Card key={chain.id} className="cursor-pointer hover:bg-muted/10 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{chain.companyName}</CardTitle>
                          {getStatusBadge(chain.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground mb-4">
                          <p>{chain.description}</p>
                          <p className="mt-1">{chain.industryType}</p>
                          <p className="mt-1">{chain.factoryCount} factories, {chain.locations.length} countries</p>
                          <p className="mt-1">Requested: {chain.requestDate}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewSupplyChain(chain.id)}
                          >
                            Review
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Supply Chains Found</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      {searchQuery 
                        ? "No supply chains match your search criteria" 
                        : "There are no supply chains assigned for your review at the moment"}
                    </p>
                    {searchQuery && (
                      <Button variant="outline" onClick={() => setSearchQuery('')}>
                        Clear Search
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        </TabsContent>

        <TabsContent value="audits">
          <div className="grid gap-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">My Audits</h2>
                <Button size="sm" className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Create Audit
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Audits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Global Textiles Ltd.</p>
                        <p className="text-sm text-muted-foreground">Last updated: 3 days ago</p>
                      </div>
                      <Button variant="outline" size="sm">View Notes</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Tech Solutions Inc.</p>
                        <p className="text-sm text-muted-foreground">Last updated: 1 week ago</p>
                      </div>
                      <Button variant="outline" size="sm">View Notes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid gap-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <Search className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Browse Supply Chains</h3>
                        <p className="text-sm text-muted-foreground">Search by material or location</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Auditor Assistant</h3>
                        <p className="text-sm text-muted-foreground">AI-powered audit helper</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <AlertTriangle className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Flag Issues</h3>
                        <p className="text-sm text-muted-foreground">Report compliance problems</p>
                      </div>
                    </div>
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
