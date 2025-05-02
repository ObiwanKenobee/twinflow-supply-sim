
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProcessFlowViewer } from "@/components/ProcessFlowViewer";
import { RiskDashboard } from "@/components/RiskDashboard";
import { Loader2, Pen, Trash2, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchSupplyChain, deleteSupplyChain, ExtendedSimulationResponse } from "@/services/supplyChainApi";

export default function SupplyChainDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [supplyChain, setSupplyChain] = useState<ExtendedSimulationResponse | null>(null);

  useEffect(() => {
    if (id) {
      loadSupplyChain(id);
    }
  }, [id]);

  const loadSupplyChain = async (chainId: string) => {
    try {
      setIsLoading(true);
      const data = await fetchSupplyChain(chainId);
      setSupplyChain(data);
    } catch (error) {
      console.error("Error loading supply chain:", error);
      toast({
        title: "Error",
        description: "Failed to load supply chain details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/simulate?edit=${id}`);
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this supply chain?")) {
      return;
    }
    
    try {
      setIsDeleting(true);
      await deleteSupplyChain(id);
      toast({
        title: "Success",
        description: "Supply chain deleted successfully",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting supply chain:", error);
      toast({
        title: "Error",
        description: "Failed to delete supply chain",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportReport = () => {
    toast({
      title: "Generating report",
      description: "Your PDF report is being generated",
    });
    // In a real implementation, this would call an API to generate and download a PDF
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!supplyChain) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Supply Chain Not Found</h1>
        <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{supplyChain?.name || "Supply Chain Details"}</h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" /> Export Report
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <Pen className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            Delete
          </Button>
        </div>
      </div>

      {supplyChain.steps && supplyChain.connections && (
        <ProcessFlowViewer 
          steps={supplyChain.steps} 
          connections={supplyChain.connections}
          overallRisk={supplyChain.overallRisk}
        />
      )}

      {supplyChain.steps && (
        <RiskDashboard 
          steps={supplyChain.steps}
          overallRisk={supplyChain.overallRisk}
          summary={supplyChain.summary}
        />
      )}

      {/* Supplier Connection Section */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {supplyChain.steps?.map((step, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">{step.name}</p>
                  <p className="text-sm text-muted-foreground">{step.location}</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
