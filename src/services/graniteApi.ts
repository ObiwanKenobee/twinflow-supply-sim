
// This simulates the API to IBM's Granite models
import { toast } from "sonner";

// API types
export interface SimulationRequest {
  description: string;
  steps?: number;
}

export interface ProcessStep {
  id: string;
  name: string;
  location: string;
  duration: string;
  cost: string;
  riskLevel: "low" | "medium" | "high";
  riskFactors: string[];
  laborInfo: string;
  x?: number;
  y?: number;
}

export interface Connection {
  source: string;
  target: string;
  label?: string;
}

export interface SimulationResponse {
  steps: ProcessStep[];
  connections: Connection[];
  overallRisk: "low" | "medium" | "high";
  summary: string;
}

export interface LaborAnalysisRequest {
  contractText: string;
}

export interface LaborAnalysisResponse {
  score: number; // 0-100
  issues: Array<{
    severity: "low" | "medium" | "high";
    description: string;
    recommendation: string;
  }>;
  summary: string;
}

export interface ComplianceReportRequest {
  simulationId: string;
}

export interface ComplianceReport {
  title: string;
  date: string;
  sdgAlignment: Record<string, number>; // SDG number to score
  findings: Array<{
    category: string;
    score: number;
    details: string;
  }>;
  recommendations: string[];
}

// Mock data function to simulate API responses
const getMockProcessSteps = (description: string): ProcessStep[] => {
  // Analyze the description to extract steps
  const parts = description.toLowerCase().split(/→|to|then|next/);
  const steps: ProcessStep[] = [];
  
  // Default risk distribution for demo
  const riskLevels: Array<"low" | "medium" | "high"> = ["medium", "low", "high"];
  
  parts.forEach((part, index) => {
    if (!part.trim()) return;
    
    // Extract product and location from the description
    const productMatch = part.match(/\b(cotton|leather|fabric|steel|electronics|coffee|tea|cocoa|wool|silk|components|parts|assembly|packaging)\b/i);
    const locationMatch = part.match(/\b(china|india|vietnam|bangladesh|mexico|brazil|thailand|malaysia|indonesia|philippines|usa|europe|africa|japan)\b/i);
    
    const product = productMatch ? productMatch[0] : `Product ${index + 1}`;
    const location = locationMatch ? locationMatch[0].charAt(0).toUpperCase() + locationMatch[0].slice(1) : `Location ${index + 1}`;
    
    const processes = [
      "Sourcing",
      "Manufacturing",
      "Processing",
      "Assembly",
      "Packaging",
      "Distribution"
    ];
    
    const process = processes[index % processes.length];
    
    const riskFactors = [
      ["Weather disruptions", "Political instability", "Supply shortages"],
      ["Quality control issues", "Equipment failures", "Labor shortages"],
      ["Regulatory compliance", "Labor rights violations", "Environmental impact"]
    ];
    
    steps.push({
      id: `step-${index + 1}`,
      name: `${process} ${product}`,
      location,
      duration: `${Math.floor(Math.random() * 10) + 1} weeks`,
      cost: `$${Math.floor(Math.random() * 50000) + 10000}`,
      riskLevel: riskLevels[index % riskLevels.length],
      riskFactors: riskFactors[index % riskFactors.length],
      laborInfo: `${Math.floor(Math.random() * 200) + 50} workers, ${Math.floor(Math.random() * 50) + 40}% female`
    });
  });
  
  return steps;
};

// Generate connections between steps
const generateConnections = (steps: ProcessStep[]): Connection[] => {
  return steps.slice(0, -1).map((step, index) => ({
    source: step.id,
    target: `step-${index + 2}`,
    label: `${Math.floor(Math.random() * 10) + 1} days`
  }));
};

// Mock risk calculation
const calculateOverallRisk = (steps: ProcessStep[]): "low" | "medium" | "high" => {
  const riskScores = { "low": 1, "medium": 2, "high": 3 };
  const totalScore = steps.reduce((sum, step) => sum + riskScores[step.riskLevel], 0);
  const avgScore = totalScore / steps.length;
  
  if (avgScore < 1.5) return "low";
  if (avgScore < 2.5) return "medium";
  return "high";
};

// Granite API simulation
export const simulateSupplyChain = async (request: SimulationRequest): Promise<SimulationResponse> => {
  try {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const steps = getMockProcessSteps(request.description);
    const connections = generateConnections(steps);
    const overallRisk = calculateOverallRisk(steps);
    
    return {
      steps,
      connections,
      overallRisk,
      summary: `This supply chain has ${steps.length} steps with an overall ${overallRisk} risk profile. Key concerns are in ${steps.find(s => s.riskLevel === "high")?.location || "manufacturing"} related to ${steps.find(s => s.riskLevel === "high")?.riskFactors[0] || "labor rights"}.`
    };
  } catch (error) {
    toast.error("Failed to simulate supply chain");
    console.error("Error simulating supply chain:", error);
    throw error;
  }
};

export const analyzeLaborPractices = async (request: LaborAnalysisRequest): Promise<LaborAnalysisResponse> => {
  try {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, just generate random analysis
    const score = Math.floor(Math.random() * 100);
    
    const possibleIssues = [
      {
        severity: "high" as const,
        description: "Contract allows withholding of payment based on undefined 'quality' metrics",
        recommendation: "Define clear quality standards and remove payment withholding clauses"
      },
      {
        severity: "medium" as const,
        description: "Working hours exceed local regulations during peak seasons",
        recommendation: "Implement shift system to prevent overtime violations"
      },
      {
        severity: "low" as const,
        description: "Insufficient clarity on break periods",
        recommendation: "Specify break durations and frequency in accordance with ILO standards"
      },
      {
        severity: "high" as const,
        description: "Worker documents retention policy may restrict freedom of movement",
        recommendation: "Eliminate document retention practices entirely"
      },
      {
        severity: "medium" as const,
        description: "Ambiguous grievance procedures for workers",
        recommendation: "Establish clear reporting channels and protection for whistleblowers"
      }
    ];
    
    // Select 2-4 random issues
    const issueCount = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...possibleIssues].sort(() => 0.5 - Math.random());
    const selectedIssues = shuffled.slice(0, issueCount);
    
    return {
      score,
      issues: selectedIssues,
      summary: `Labor practices analysis reveals a compliance score of ${score}/100. ${selectedIssues.length} issues identified requiring attention, primarily related to ${selectedIssues[0].description.split(' ')[0]} and ${selectedIssues[1].description.split(' ')[0]}.`
    };
  } catch (error) {
    toast.error("Failed to analyze labor practices");
    console.error("Error analyzing labor practices:", error);
    throw error;
  }
};

export const generateComplianceReport = async (request: ComplianceReportRequest): Promise<ComplianceReport> => {
  try {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const date = new Date().toISOString().split('T')[0];
    
    const sdgGoals = {
      "SDG 8: Decent Work and Economic Growth": Math.floor(Math.random() * 40) + 60,
      "SDG 12: Responsible Consumption and Production": Math.floor(Math.random() * 40) + 60,
      "SDG 13: Climate Action": Math.floor(Math.random() * 40) + 60
    };
    
    const findings = [
      {
        category: "Labor Rights",
        score: Math.floor(Math.random() * 40) + 60,
        details: "Assessment of worker conditions, wages, and rights protections across the supply chain."
      },
      {
        category: "Environmental Impact",
        score: Math.floor(Math.random() * 40) + 60,
        details: "Evaluation of environmental practices, resource usage, and pollution mitigation strategies."
      },
      {
        category: "Governance & Transparency",
        score: Math.floor(Math.random() * 40) + 60,
        details: "Analysis of business practices, regulatory compliance, and corporate governance standards."
      }
    ];
    
    const recommendations = [
      "Implement third-party labor audits at identified high-risk facilities",
      "Establish clear traceability documentation for all raw materials",
      "Deploy carbon footprint tracking across all logistics operations",
      "Develop supplier code of conduct with verification mechanisms"
    ];
    
    return {
      title: "Supply Chain ESG Compliance Report",
      date,
      sdgAlignment: sdgGoals,
      findings,
      recommendations
    };
  } catch (error) {
    toast.error("Failed to generate compliance report");
    console.error("Error generating compliance report:", error);
    throw error;
  }
};
