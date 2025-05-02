
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProcessStep } from "@/services/graniteApi";
import { AlertTriangle, AlertCircle, ArrowDownRight, ArrowUpRight, Clock, DollarSign, Users, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RiskDashboardProps {
  steps: ProcessStep[];
  overallRisk: string;
  summary: string;
}

export function RiskDashboard({ steps, overallRisk, summary }: RiskDashboardProps) {
  // Calculate risk metrics
  const highRiskSteps = steps.filter(step => step.riskLevel === "high");
  const mediumRiskSteps = steps.filter(step => step.riskLevel === "medium");
  const lowRiskSteps = steps.filter(step => step.riskLevel === "low");
  
  const riskPercentages = {
    high: (highRiskSteps.length / steps.length) * 100,
    medium: (mediumRiskSteps.length / steps.length) * 100,
    low: (lowRiskSteps.length / steps.length) * 100,
  };

  // Find the most common risk factor
  const allRiskFactors = steps.flatMap(step => step.riskFactors);
  const riskFactorCounts = allRiskFactors.reduce((acc, factor) => {
    acc[factor] = (acc[factor] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topRiskFactor = Object.entries(riskFactorCounts)
    .sort(([, countA], [, countB]) => countB - countA)[0]?.[0] || "Unknown";
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Risk Assessment</h2>
        <p className="text-muted-foreground">{summary}</p>
      </div>

      {overallRisk === "high" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Risk Detected</AlertTitle>
          <AlertDescription>
            Your supply chain has high-risk elements that require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {overallRisk === "medium" && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Moderate Risk Detected</AlertTitle>
          <AlertDescription>
            Your supply chain has some risk elements that should be addressed.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Distribution</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-1" />
                  <span>High Risk ({Math.round(riskPercentages.high)}%)</span>
                </div>
                <Progress value={riskPercentages.high} className="h-1 bg-neutral-200" indicatorClassName="bg-red-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1" />
                  <span>Medium Risk ({Math.round(riskPercentages.medium)}%)</span>
                </div>
                <Progress value={riskPercentages.medium} className="h-1 bg-neutral-200" indicatorClassName="bg-yellow-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-1" />
                  <span>Low Risk ({Math.round(riskPercentages.low)}%)</span>
                </div>
                <Progress value={riskPercentages.low} className="h-1 bg-neutral-200" indicatorClassName="bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Primary Risk Factor</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topRiskFactor}</div>
            <p className="text-xs text-muted-foreground">
              Appears in {Math.max(...Object.values(riskFactorCounts))} of {steps.length} supply chain segments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {highRiskSteps.length > 0 ? (
                highRiskSteps.map((step) => (
                  <div key={step.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                      <span className="text-sm">{step.location}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{step.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No high risk locations identified</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Factors</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center justify-between">
                  <span className="text-sm">{step.name}</span>
                  <span className="text-sm font-medium">{step.duration}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Analysis</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center justify-between">
                  <span className="text-sm">{step.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{step.cost}</span>
                    {Math.random() > 0.5 ? (
                      <ArrowUpRight className="ml-1 h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowDownRight className="ml-1 h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workforce Analysis</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center justify-between">
                  <span className="text-sm">{step.location}</span>
                  <span className="text-sm">{step.laborInfo}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
