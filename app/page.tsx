import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Problem } from "@/components/home/Problem";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InsidePreview } from "@/components/home/InsidePreview";
import { ProductHighlight } from "@/components/home/ProductHighlight";
import { Features } from "@/components/home/Features";
import { StoryAndGift } from "@/components/home/StoryAndGift";
import { Testimonials } from "@/components/home/Testimonials";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem />
      <HowItWorks />
      <InsidePreview />
      <ProductHighlight />
      <Features />
      <StoryAndGift />
      <Testimonials />
      <AboutTeaser />
      <FAQ />
      <FinalCTA />
    </>
  );
}
