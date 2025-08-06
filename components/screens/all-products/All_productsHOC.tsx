import dynamic from "next/dynamic";


const All_products = dynamic(() => import("./Allproducts"), {
    ssr: true,
});

const All_productsHOC = () => {
    return <All_products  />;
};

export default All_productsHOC;
