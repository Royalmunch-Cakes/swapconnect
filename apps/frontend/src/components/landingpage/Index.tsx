import BannerSection from "./BannerSection";
import BlogSection from "./Blog";
import Hero from "./Hero";
import ProductCategories from "./ProductCategories";
import SummerSaleBanner from "./SummerSaleBanner";
import TopSales from "./Topsales";
import Values from "./Values";

const LandingPage: React.FC = () => (
  <>
    <Hero />
    <ProductCategories />
    <Values />
    <BannerSection />
    <TopSales />
    <BlogSection />
    <SummerSaleBanner />
  </>
);
export default LandingPage;
