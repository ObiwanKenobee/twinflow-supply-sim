
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-sm mb-3">Product</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Features</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Pricing</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Use Cases</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Documentation</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">API Reference</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Blog</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Tutorials</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">About</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Careers</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Contact</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Privacy</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Terms</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Security</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground text-sm">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-8 h-8 mr-2">
              <div className="absolute inset-0 bg-blue-500 rounded-md"></div>
              <div className="absolute inset-0 bg-blue-700 rounded-md transform rotate-45 scale-75"></div>
            </div>
            <span className="font-bold">TwinChain</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TwinChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
