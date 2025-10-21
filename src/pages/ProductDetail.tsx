import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Heart, Truck, Shield, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAllProducts } from "@/hooks/useProducts";
import { useAddToCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: products, isLoading } = useAllProducts();
  const addToCart = useAddToCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const product = products?.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    
    addToCart.mutate({
      product_id: product.id,
      quantity
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container px-4">
          <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="animate-fade-in">
              <div className="overflow-hidden rounded-lg bg-muted">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="mb-4">
                <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                  {product.category}
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>
              <p className="mb-6 text-3xl font-bold text-accent">NPR {product.price}</p>

              <p className="mb-8 text-lg text-muted-foreground">{product.description}</p>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="mb-3 text-sm font-semibold uppercase">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-accent" />
                  <span className="text-sm">Free shipping on orders over रू 13,000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-sm">30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
