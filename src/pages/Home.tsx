
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Check, FileText, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Supply Chain AI Assistant
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Build Digital Twins for Your Supply Chain
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TwinChain helps small and medium businesses simulate their supply chains using AI-generated digital twins. Identify risks, improve compliance, and optimize your operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/simulate">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 opacity-10 animate-pulse-blue"></div>
                <div className="absolute inset-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                    <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Supply Chain Intelligence
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TwinChain provides powerful tools to visualize, analyze, and optimize your supply chain operations.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 pt-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <BarChart2 className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Process Visualization</h3>
                <p className="text-muted-foreground">
                  Interactive flowcharts and visualizations to map your entire supply chain process.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Risk Alerts</h3>
                <p className="text-muted-foreground">
                  Real-time risk detection and alerts based on public datasets and AI analysis.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Compliance Reports</h3>
                <p className="text-muted-foreground">
                  Auto-generated ESG and compliance reports to meet regulatory requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How TwinChain Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Just describe your supply chain in natural language and let our AI do the heavy lifting.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 pt-12">
            <div className="flex flex-col items-center space-y-4 text-center relative">
              <div className="rounded-full bg-primary w-12 h-12 flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Describe Your Supply Chain</h3>
                <p className="text-muted-foreground">
                  Using natural language, describe your supply chain's key stages, locations, and processes.
                </p>
              </div>
              <div className="hidden md:block absolute top-6 left-full w-16 h-1 bg-slate-200 dark:bg-gray-700 -ml-4 -mr-4"></div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center relative">
              <div className="rounded-full bg-primary w-12 h-12 flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Generate Digital Twin</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your description and creates a detailed digital twin simulation of your supply chain.
                </p>
              </div>
              <div className="hidden md:block absolute top-6 left-full w-16 h-1 bg-slate-200 dark:bg-gray-700 -ml-4 -mr-4"></div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary w-12 h-12 flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Analyze & Optimize</h3>
                <p className="text-muted-foreground">
                  View risks, generate compliance reports, and optimize your supply chain based on AI recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Businesses
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our customers say about using TwinChain for their supply chain management.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 pt-12">
            <div className="flex flex-col space-y-4 rounded-xl border p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-slate-100 dark:bg-gray-800 h-12 w-12"></div>
                <div>
                  <h3 className="text-lg font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Supply Chain Manager, EcoTextile</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "TwinChain has transformed how we manage our global textile supply chain. We identified labor risks we weren't aware of and improved our compliance score by 32% in just three months."
              </p>
            </div>
            <div className="flex flex-col space-y-4 rounded-xl border p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-slate-100 dark:bg-gray-800 h-12 w-12"></div>
                <div>
                  <h3 className="text-lg font-bold">Miguel Hernandez</h3>
                  <p className="text-sm text-muted-foreground">Operations Director, Global Foods</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The visualization tools helped us spot bottlenecks in our food supply chain, reducing delays by 24% and improving our overall efficiency. The compliance reports saved us weeks of manual work."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Optimize Your Supply Chain?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
                Create your first digital twin simulation in minutes and discover insights to improve your operations.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/simulate">
                  Start Your Simulation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Business Benefits
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Improve Your Supply Chain Resilience
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TwinChain provides powerful insights to help you build a more resilient, efficient, and compliant supply chain.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Reduce Risk Exposure</h3>
                  <p className="text-muted-foreground">
                    Identify and mitigate risks before they impact your operations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Improve Compliance</h3>
                  <p className="text-muted-foreground">
                    Meet ESG standards and regulatory requirements with auto-generated reports.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Optimize Operations</h3>
                  <p className="text-muted-foreground">
                    Identify bottlenecks and inefficiencies in your supply chain.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Build Transparency</h3>
                  <p className="text-muted-foreground">
                    Create a clear view of your entire supply chain for stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
