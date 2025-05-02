
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart2, Settings, User, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="grid gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Platform Overview</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">247</p>
                  <p className="text-xs text-green-500 mt-1">+12% this month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Active Supply Chains</p>
                  <p className="text-3xl font-bold">42</p>
                  <p className="text-xs text-green-500 mt-1">+5% this month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Risk Alerts</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs text-red-500 mt-1">+3 new today</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">AI Prompts Today</p>
                  <p className="text-3xl font-bold">124</p>
                  <p className="text-xs text-green-500 mt-1">+18% this week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Administration</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">User Management</h3>
                    <p className="text-sm text-muted-foreground">Manage platform users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Settings className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Prompt Tuner</h3>
                    <p className="text-sm text-muted-foreground">Configure AI prompts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Platform usage statistics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-muted/10 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Settings className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Platform Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure system options</p>
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
