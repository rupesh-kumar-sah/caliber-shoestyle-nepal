import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Caliber Shoes" className="h-10 w-10" />
              <span className="text-xl font-bold text-primary">Caliber Shoes</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium footwear for every style and occasion. Quality you can trust, comfort you can feel.
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
              <li>
                <Link to="/admin" className="text-sm text-muted-foreground transition-smooth hover:text-accent">
                  Admin Login
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
                <span>info@calibershoes.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Kathmandu, Nepal</span>
              </div>
              
              <div className="pt-4">
                <p className="mb-2 text-sm font-medium">Subscribe to our newsletter</p>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="text-sm"
                  />
                  <Button size="sm" variant="hero">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Caliber Shoes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
