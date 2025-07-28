import HeroSec from "@/components/screens/Hero-Sec/HeroSec";
import Products from "@/components/screens/products/Products";

export default function Home() {
  return (
   <div className="flex flex-col items-center">
     <HeroSec/>
     <Products/>
   </div>
  );
}
