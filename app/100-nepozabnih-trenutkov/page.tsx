import { Metadata } from "next";
import { ProductHighlight } from "@/components/home/ProductHighlight";
import { InsidePreview } from "@/components/home/InsidePreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { StoryAndGift } from "@/components/home/StoryAndGift";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "100 nepozabnih trenutkov | Trenutki za dva",
  description: "Knjiga, ki ne stoji na polici. Knjiga, ki jo doživita. Naroči zdaj.",
};

export default function ProductPage() {
  return (
    <>
      <ProductHighlight />
      <div className="bg-cream text-center px-4 py-12 max-w-3xl mx-auto space-y-6">
        <h3 className="text-2xl md:text-3xl font-serif text-espresso">Zakaj knjiga obstaja</h3>
        <p className="text-soft-brown leading-relaxed">
          Vsakdan hitro postane rutina. Služba, obveznosti, telefoni... Knjiga »100 nepozabnih trenutkov« 
          je nastala z enim samim namenom — da vama ni treba vedno znova iskati idej. Da se preprosto ustavita 
          in namenita čas drug drugemu.
        </p>
      </div>
      <HowItWorks />
      <Features />
      <InsidePreview />
      <StoryAndGift />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
