import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="group overflow-hidden transition-smooth hover:shadow-lg animate-scale-in">
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-64 w-full object-cover transition-smooth group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur transition-smooth hover:bg-background"
          >
            <Heart
              className={`h-5 w-5 transition-smooth ${
                isLiked ? "fill-accent text-accent" : "text-foreground"
              }`}
            />
          </button>
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {category}
            </span>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="mb-2 text-lg font-semibold transition-smooth hover:text-accent">
            {name}
          </h3>
        </Link>
        <p className="text-2xl font-bold text-accent">${price}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="lg">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
