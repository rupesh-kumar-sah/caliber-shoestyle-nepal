import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main 404 Content */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
            <p className="text-muted-foreground mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="flex items-center gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex items-center gap-2">
              <Link to="#" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="StyleNepal" className="h-10 w-10" />
                <span className="text-xl font-bold text-primary">StyleNepal</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your destination for premium fashion. Quality, style, and comfort in every product.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="rounded-full bg-primary p-2 text-primary-foreground transition-smooth hover:bg-accent">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="rounded-full bg-primary p-2 text-primary-foreground transition-smooth hover:bg-accent">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="rounded-full bg-primary p-2 text-primary-foreground transition-smooth hover:bg-accent">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-sm text-muted-foreground transition-smooth hover:text-accent">
                    Shop All
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-sm text-muted-foreground transition-smooth hover:text-accent">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground transition-smooth hover:text-accent">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground transition-smooth hover:text-accent">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-foreground">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/shipping" className="text-sm text-muted-foreground transition-smooth hover:text-accent">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-sm text-muted-foreground transition-smooth hover:text-accent">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-muted-foreground transition-smooth hover:text-accent">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-foreground">Stay Connected</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>info@stylenepal.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StyleNepal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
