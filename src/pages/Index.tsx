import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Truck, Shield, Headphones } from "lucide-react";

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />

        {/* Features Section */}
        <section className="border-b bg-muted/30 py-12">
          <div className="container px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center space-x-4 animate-fade-in">
                <div className="rounded-full bg-accent p-3">
                  <Truck className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over $100</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="rounded-full bg-accent p-3">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">100% secure transactions</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="rounded-full bg-accent p-3">
                  <Star className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Quality Guaranteed</h3>
                  <p className="text-sm text-muted-foreground">Premium materials</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="rounded-full bg-accent p-3">
                  <Headphones className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container px-4">
            <div className="mb-12 text-center animate-fade-in">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Products</h2>
              <p className="text-lg text-muted-foreground">
                Discover our most popular shoes loved by customers
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/products">
                <Button size="lg" variant="outline">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-muted/30 py-16">
          <div className="container px-4">
            <div className="mb-12 text-center animate-fade-in">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Shop by Category</h2>
              <p className="text-lg text-muted-foreground">
                Find the perfect shoes for every occasion
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {["Casual", "Athletic", "Formal"].map((category, index) => (
                <Link
                  key={category}
                  to={`/products?category=${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 bg-gradient-to-br from-primary to-primary/80">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-3xl font-bold text-primary-foreground transition-smooth group-hover:scale-110">
                        {category}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container px-4">
            <div className="mb-12 text-center animate-fade-in">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground">
                Real reviews from real customers
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  review: "Best shoes I've ever owned! Comfortable and stylish.",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  review: "Great quality and fast shipping. Highly recommend!",
                  rating: 5,
                },
                {
                  name: "Emily Davis",
                  review: "Love the variety and excellent customer service.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="rounded-lg border bg-card p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground">{testimonial.review}</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
