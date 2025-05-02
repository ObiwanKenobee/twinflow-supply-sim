
import { useState } from "react";
import { SupplyChainInput } from "@/components/SupplyChainInput";
import { ProcessFlowViewer } from "@/components/ProcessFlowViewer";
import { RiskDashboard } from "@/components/RiskDashboard";
import { SimulationResponse } from "@/services/graniteApi";
import { Loader2 } from "lucide-react";

export default function Simulate() {
  const [simulationResult, setSimulationResult] = useState<SimulationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulationComplete = (result: SimulationResponse) => {
    setSimulationResult(result);
  };

  return (
    <div className="container py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Supply Chain Simulation</h1>
        <p className="text-muted-foreground mt-2">
          Describe your supply chain using natural language and generate a digital twin simulation.
        </p>
      </div>

      <SupplyChainInput 
        onSimulationComplete={handleSimulationComplete}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            Generating your digital twin simulation...
            <br />
            <span className="text-sm">Analyzing supply chain data and creating visualization</span>
          </p>
        </div>
      ) : simulationResult ? (
        <div className="space-y-10">
          <ProcessFlowViewer 
            steps={simulationResult.steps} 
            connections={simulationResult.connections}
            overallRisk={simulationResult.overallRisk}
          />
          
          <RiskDashboard 
            steps={simulationResult.steps}
            overallRisk={simulationResult.overallRisk}
            summary={simulationResult.summary}
          />
        </div>
      ) : null}
    </div>
  );
}
