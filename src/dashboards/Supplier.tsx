
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart2, FileText, Mic, Plus } from "lucide-react";

export default function SupplierDashboard() {
  return (
    <DashboardLayout title="Supplier Dashboard">
      <div className="grid gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">My Operations</h2>
            <Button size="sm" className="flex items-center">
              <Plus className="h-4 w-4 mr-1" /> Add Operation
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Garment Factory - Dhaka</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Clothing production and assembly</p>
                  <p className="mt-1">Workers: 120</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs">Low Risk</span>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-dashed cursor-pointer hover:bg-muted/5 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="font-medium">Add New Operation</p>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Describe your manufacturing or supply process
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Upload Compliance Docs</h3>
                    <p className="text-sm text-muted-foreground">Submit policies and contracts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Mic className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Audio Compliance</h3>
                    <p className="text-sm text-muted-foreground">Upload field recordings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Labor Insights</h3>
                    <p className="text-sm text-muted-foreground">View risk scores and trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
