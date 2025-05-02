
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { BarChart2, FileText, Globe, Plus } from "lucide-react";

export default function SMEDashboard() {
  return (
    <DashboardLayout title="SME Dashboard">
      <div className="grid gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">My Supply Chains</h2>
            <Link to="/simulate">
              <Button size="sm" className="flex items-center">
                <Plus className="h-4 w-4 mr-1" /> Create New Twin
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Supply Chain Card 1 */}
            <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cotton Garment Supply Chain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>India → Vietnam → Bangladesh → UK</p>
                  <p className="mt-1">Last updated: 2 days ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs">Medium Risk</span>
                  </div>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>

            {/* Supply Chain Card 2 */}
            <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Electronics Assembly</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>China → Malaysia → Germany</p>
                  <p className="mt-1">Last updated: 1 week ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">High Risk</span>
                  </div>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Create New Chain Card */}
            <Card className="border-dashed cursor-pointer hover:bg-muted/5 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="font-medium">Create New Supply Chain</p>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Describe your supply chain and generate a digital twin
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
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Twin Visualizations</h3>
                    <p className="text-sm text-muted-foreground">View interactive maps</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Compliance Reports</h3>
                    <p className="text-sm text-muted-foreground">Access ESG summaries</p>
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
                    <h3 className="font-medium">Supplier Network</h3>
                    <p className="text-sm text-muted-foreground">Manage your suppliers</p>
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
