
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SimulationRequest, simulateSupplyChain } from "@/services/graniteApi";
import { toast } from "sonner";

interface SupplyChainInputProps {
  onSimulationComplete: (result: any) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function SupplyChainInput({ 
  onSimulationComplete,
  isLoading,
  setIsLoading
}: SupplyChainInputProps) {
  const [description, setDescription] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error("Please enter a supply chain description");
      return;
    }
    
    const request: SimulationRequest = {
      description
    };
    
    try {
      setIsLoading(true);
      const result = await simulateSupplyChain(request);
      onSimulationComplete(result);
      toast.success("Supply chain simulation complete");
    } catch (error) {
      console.error("Simulation error:", error);
      toast.error("Failed to simulate supply chain");
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    "Cotton from India → spinning in Vietnam → garment in Bangladesh",
    "Coffee beans from Colombia → roasting in Mexico → packaging in USA",
    "Electronics components from China → assembly in Malaysia → distribution in Europe"
  ];
  
  const handleExampleClick = (example: string) => {
    setDescription(example);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Describe Your Supply Chain</h2>
        <p className="text-muted-foreground">
          Explain your supply chain process using natural language. Include materials, locations, and key processes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <textarea
            className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background"
            placeholder="Example: Cotton from India → spinning in Vietnam → garment in Bangladesh"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />
          
          <div className="text-sm text-muted-foreground">
            <span>Try an example: </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {examplePrompts.map((example, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? "Generating Digital Twin..." : "Generate Digital Twin"}
        </Button>
      </form>
    </div>
  );
}
