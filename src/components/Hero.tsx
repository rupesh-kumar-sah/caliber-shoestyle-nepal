import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-shoe.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Premium Shoes" 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="container relative px-4 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Step Into Style
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl lg:text-2xl">
            Discover our premium collection of shoes that blend comfort, quality, and cutting-edge design
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" size="xl" className="w-full sm:w-auto bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Browse Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"></div>
    </section>
  );
};

export default Hero;
