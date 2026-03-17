import HeroSection from '../components/landing/HeroSection';
import TrustBar from '../components/landing/TrustBar';
import CategoryShowcase from '../components/landing/CategoryShowcase';
import FeaturedProducts from '../components/landing/FeaturedProducts';
import DealsSection from '../components/landing/DealsSection';
import BrandsSection from '../components/landing/BrandsSection';
import PromoSection from '../components/landing/PromoSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import NewsletterSection from '../components/landing/NewsletterSection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <CategoryShowcase />
      <FeaturedProducts />
      <DealsSection />
      <BrandsSection />
      <PromoSection />
      <TestimonialsSection />
      <FeaturesSection />
      <NewsletterSection />
    </main>
  );
}
