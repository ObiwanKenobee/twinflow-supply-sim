
import { ComplianceReport } from "@/components/ComplianceReport";

export default function Reports() {
  // In a real app, this would be fetched from state or passed through navigation
  const simulationId = "sim-12345";

  return (
    <div className="container py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compliance Reports</h1>
        <p className="text-muted-foreground mt-2">
          Generate detailed compliance and ESG reports based on your supply chain simulation.
        </p>
      </div>

      <ComplianceReport simulationId={simulationId} />
    </div>
  );
}
