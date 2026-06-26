import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PopularLocations from "@/components/home/PopularLocations";
import CTASection from "@/components/home/CTASection";
import FeaturedPropertiesSection from "@/components/home/FeaturedPropertiesSection";
import PurposeCards from "@/components/home/PurposeCards";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PurposeCards />
      <Suspense>
        <FeaturedPropertiesSection />
      </Suspense>
      <HowItWorks />
      <PopularLocations />
      <CTASection />
    </>
  );
}
