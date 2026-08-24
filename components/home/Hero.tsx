"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-24 pb-12 md:pt-32 md:pb-32">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center text-center md:text-left">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto md:mx-0"
        >
          <span className="text-xs md:text-sm font-semibold tracking-wider text-terracotta uppercase mb-3 md:mb-4 block">
            Knjiga za pare
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[72px] leading-[1.1] mb-5 md:mb-6 text-espresso text-balance">
            100 idej. Nešteto skupnih spominov.
          </h1>
          <p className="text-base md:text-xl text-soft-brown mb-6 md:mb-8 text-balance max-w-lg mx-auto md:mx-0 leading-relaxed">
            Knjiga s 100 idejami za zmenke in doživetja, ki vaju spodbuja, da preizkusita nekaj novega, preživita kakovosten Äčas skupaj in ustvarita spomine, ki ostanejo.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10 justify-center md:justify-start">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/100-nepozabnih-trenutkov">Odkrij knjigo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="#notranjost">Poglej notranjost</Link>
            </Button>
          </div>

          <div className="space-y-2 flex flex-col items-center md:items-start">
            {[
              "100 idej za zmenke",
              "Prostor za vajine spomine",
              "Popolno darilo za pare",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-soft-brown">
                <Check className="w-4 h-4 text-sage shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative h-[400px] md:h-[650px] w-full rounded-2xl overflow-hidden bg-sand/30 mt-4 md:mt-0"
        >
          <Image 
            src="/images/book-photo-3.jpg" 
            alt="Knjiga 100 nepozabnih trenutkov" 
            fill 
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-x-0 top-0 pt-8 md:pt-16 flex flex-col items-center text-center pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-script text-espresso drop-shadow-md mb-1 md:mb-2">Trenutki za dva</h2>
            <p className="text-lg md:text-2xl font-serif text-espresso/90 italic drop-shadow-sm px-6">ustvari svoje spomine za vedno</p>
          </div>

          {/* Floating Element */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-6 md:bottom-8 left-4 md:left-6 bg-warm-white/95 backdrop-blur-md px-5 py-3 md:px-6 md:py-4 rounded-xl shadow-md border border-sand hidden sm:block"
          >
            <p className="font-serif text-espresso text-base md:text-lg font-medium">100 skupnih doživetij</p>
            <p className="text-xs md:text-sm text-soft-brown">Za vajino zgodbo</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

