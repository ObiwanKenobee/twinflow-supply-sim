
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LaborAnalysisResponse, analyzeLaborPractices } from "@/services/graniteApi";
import { AlertTriangle, ArrowRight, Upload } from "lucide-react";
import { toast } from "sonner";

export function LaborAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [contractText, setContractText] = useState("");
  const [analysis, setAnalysis] = useState<LaborAnalysisResponse | null>(null);

  const handleAnalyze = async () => {
    if (!contractText.trim()) {
      toast.error("Please enter contract text for analysis");
      return;
    }

    setIsLoading(true);
    try {
      const result = await analyzeLaborPractices({ contractText });
      setAnalysis(result);
      toast.success("Labor practices analysis complete");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze labor practices");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Labor Risk Analysis</h2>
        <p className="text-muted-foreground">
          Analyze supplier contracts and policies for labor rights compliance and risk indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Contract or Policy</CardTitle>
              <CardDescription>
                Upload a document or paste text from a supplier agreement or labor policy to analyze.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or paste text</span>
                </div>
              </div>

              <textarea
                placeholder="Paste contract or policy text here..."
                className="w-full min-h-[200px] p-3 rounded-md border border-input bg-background"
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
              />

              <Button 
                onClick={handleAnalyze}
                disabled={isLoading || !contractText.trim()}
                className="w-full"
              >
                {isLoading ? "Analyzing..." : "Analyze Labor Practices"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          {analysis && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Labor Practices Analysis</CardTitle>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Compliance Score: </span>
                    <span 
                      className={`font-bold ${
                        analysis.score >= 70 ? 'text-green-500' : 
                        analysis.score >= 50 ? 'text-yellow-500' : 
                        'text-red-500'
                      }`}
                    >
                      {analysis.score}/100
                    </span>
                  </div>
                </div>
                <CardDescription>
                  {analysis.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Compliance Score</span>
                    <span className="text-sm text-muted-foreground">{analysis.score}%</span>
                  </div>
                  <Progress 
                    value={analysis.score} 
                    className="h-2"
                    indicatorClassName={
                      analysis.score >= 70 ? 'bg-green-500' : 
                      analysis.score >= 50 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Identified Issues</h3>
                  
                  {analysis.issues.map((issue, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-md ${
                        issue.severity === 'high' ? 'risk-high' : 
                        issue.severity === 'medium' ? 'risk-medium' : 
                        'risk-low'
                      }`}
                    >
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{issue.description}</p>
                          <p className="text-xs mt-1">Recommendation: {issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
