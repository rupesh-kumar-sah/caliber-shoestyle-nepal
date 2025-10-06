import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: number[];
  colors: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Canvas Sneakers",
    price: 89.99,
    image: product1,
    category: "Casual",
    description: "Comfortable and stylish canvas sneakers perfect for everyday wear. Features breathable material and cushioned insole.",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["White", "Navy", "Gray"],
    inStock: true,
  },
  {
    id: 2,
    name: "Pro Running Shoes",
    price: 129.99,
    image: product2,
    category: "Athletic",
    description: "High-performance running shoes with advanced cushioning technology. Designed for serious runners seeking comfort and speed.",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Red", "Black", "Blue"],
    inStock: true,
  },
  {
    id: 3,
    name: "Oxford Dress Shoes",
    price: 159.99,
    image: product3,
    category: "Formal",
    description: "Premium leather oxford shoes for professional occasions. Elegant design with superior craftsmanship.",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Black", "Brown"],
    inStock: true,
  },
  {
    id: 4,
    name: "High-Top Basketball",
    price: 149.99,
    image: product4,
    category: "Athletic",
    description: "Performance basketball shoes with ankle support and excellent traction. Built for the court.",
    sizes: [8, 9, 10, 11, 12, 13],
    colors: ["White", "Navy", "Red"],
    inStock: true,
  },
];
