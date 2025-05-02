
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-blue-500 rounded-md"></div>
              <div className="absolute inset-0 bg-blue-700 rounded-md transform rotate-45 scale-75"></div>
            </div>
            <span className="font-bold text-xl">TwinChain</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/simulate" className="text-sm font-medium hover:text-primary transition-colors">Simulate</Link>
          <Link to="/results" className="text-sm font-medium hover:text-primary transition-colors">Results</Link>
          <Link to="/reports" className="text-sm font-medium hover:text-primary transition-colors">Reports</Link>
          
          <div className="relative ml-2 group">
            <Button variant="outline" className="flex items-center gap-1">
              Resources <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link to="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Documentation</Link>
              <Link to="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">API Reference</Link>
              <Link to="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Community</Link>
            </div>
          </div>
          
          <Button>Get Started</Button>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 pt-2 border-t border-border">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/simulate" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Simulate</Link>
            <Link to="/results" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Results</Link>
            <Link to="/reports" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Reports</Link>
            <Link to="#" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Resources</Link>
            <Button className="w-full mt-2">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
