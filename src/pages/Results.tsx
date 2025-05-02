
import { LaborAnalysis } from "@/components/LaborAnalysis";

export default function Results() {
  return (
    <div className="container py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Supply Chain Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Analyze labor practices and risks in your supply chain using AI-powered tools.
        </p>
      </div>

      <LaborAnalysis />
    </div>
  );
}
