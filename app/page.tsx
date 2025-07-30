import HeroSecHOC from "@/components/screens/Hero-Sec/HeroSecHOC";
import ProductsHOC from "@/components/screens/products/ProductsHOC";

export default function Home() {
  return (
   <div className="flex flex-col items-center">
     <HeroSecHOC/>
     <ProductsHOC/>
   </div>
  );
}
