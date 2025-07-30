import dynamic from "next/dynamic";


const Products = dynamic(() => import("./Products"), {
    ssr: true,
});

const ProductsHOC = () => {
    return <Products  />;
};

export default ProductsHOC;
