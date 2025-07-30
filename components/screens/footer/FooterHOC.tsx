import dynamic from "next/dynamic";


const Footer = dynamic(() => import("./Footer"), {
    ssr: true,
});

const FooterHOC = () => {
    return <Footer  />;
};

export default FooterHOC;
