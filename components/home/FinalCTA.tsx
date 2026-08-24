"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-espresso text-cream py-32 md:py-48">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-espresso/80 z-10" />
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/book-photo-2.jpg"
          alt="100 nepozabnih trenutkov"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
        />
      </div>

      <div className="relative z-20 container-wide text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-warm-white leading-tight">
            Naslednji nepozabni trenutek se lahko začne danes.
          </h2>
          <p className="text-lg md:text-xl text-cream/80 max-w-xl mx-auto">
            100 idej, ki čakajo, da postanejo vajini spomini.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-cream text-espresso hover:bg-warm-white h-14 text-lg">
              <Link href="/100-nepozabnih-trenutkov">Naroči knjigo – 34,99 €</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-cream text-cream hover:bg-cream/10 h-14 text-lg">
              <Link href="/#notranjost">Poglej notranjost</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

