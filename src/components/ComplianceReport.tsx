
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ComplianceReport as ComplianceReportType, generateComplianceReport } from "@/services/graniteApi";
import { Check, Download, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ComplianceReportProps {
  simulationId: string;
}

export function ComplianceReport({ simulationId }: ComplianceReportProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ComplianceReportType | null>(null);

  const generateReport = async () => {
    setIsLoading(true);
    try {
      const reportData = await generateComplianceReport({ simulationId });
      setReport(reportData);
      toast.success("Compliance report generated");
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate compliance report");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!report) return;
    
    // In a real app, this would generate a PDF
    // For now, just simulate a download
    toast.success("Report download started");
    
    // Simulate download preparation
    setTimeout(() => {
      toast("Report downloaded successfully", {
        icon: <Check className="h-4 w-4" />,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Compliance Report</h2>
        <p className="text-muted-foreground">
          Generate a compliance and ESG report based on your supply chain simulation.
        </p>
      </div>

      {!report ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
            <CardDescription>
              Create a detailed compliance report analyzing your supply chain against international standards and ESG criteria.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={generateReport}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Compliance Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{report.title}</CardTitle>
                  <CardDescription>Generated on {report.date}</CardDescription>
                </div>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">SDG Alignment</h3>
                <div className="space-y-4">
                  {Object.entries(report.sdgAlignment).map(([sdg, score]) => (
                    <div key={sdg} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{sdg}</span>
                        <span className="text-sm text-muted-foreground">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Key Findings</h3>
                <div className="space-y-4">
                  {report.findings.map((finding, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="bg-muted px-4 py-2 flex items-center justify-between">
                        <h4 className="font-medium">{finding.category}</h4>
                        <div className="flex items-center">
                          <span className="text-sm font-bold mr-2">{finding.score}/100</span>
                          <div 
                            className={`h-3 w-3 rounded-full ${
                              finding.score >= 70 ? 'bg-green-500' : 
                              finding.score >= 50 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`} 
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm">{finding.details}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {report.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
