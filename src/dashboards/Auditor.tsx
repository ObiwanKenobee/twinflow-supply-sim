
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertTriangle, FileText, MessageSquare, Search } from "lucide-react";

export default function AuditorDashboard() {
  return (
    <DashboardLayout title="Auditor Dashboard">
      <div className="grid gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Supply Chains for Review</h2>
            <Button size="sm" className="flex items-center">
              <Search className="h-4 w-4 mr-1" /> Browse All
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">SME: Global Textiles Ltd.</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Cotton garment production</p>
                  <p className="mt-1">4 factories, 3 countries</p>
                  <p className="mt-1">Requested: May 1, 2025</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs">Pending Review</span>
                  </div>
                  <Button variant="ghost" size="sm">Review</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">SME: Tech Solutions Inc.</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Electronics manufacturing</p>
                  <p className="mt-1">2 factories, 2 countries</p>
                  <p className="mt-1">Requested: April 28, 2025</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">Urgent Review</span>
                  </div>
                  <Button variant="ghost" size="sm">Review</Button>
                </div>
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
                    <Search className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Browse Supply Chains</h3>
                    <p className="text-sm text-muted-foreground">Search by material or location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Auditor Assistant</h3>
                    <p className="text-sm text-muted-foreground">AI-powered audit helper</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Flag Issues</h3>
                    <p className="text-sm text-muted-foreground">Report compliance problems</p>
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
