import dynamic from "next/dynamic";


const HeroSec = dynamic(() => import("./HeroSec"), {
    ssr: true,
});

const HeroSecHOC = () => {
    return <HeroSec  />;
};

export default HeroSecHOC;
