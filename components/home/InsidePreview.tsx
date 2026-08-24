"use client";

import { motion } from "framer-motion";
import { InteractiveBook } from "./InteractiveBook";

export function InsidePreview() {
  return (
    <section
      id="notranjost"
      className="py-16 md:py-24 text-cream overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #2e2520 0%, #352e28 50%, #2e2520 100%)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-terracotta/80 mb-4"
          >
            Poglej v notranjost
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-[48px] font-serif text-warm-white mb-5"
          >
            100 strani vajine zgodbe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-cream/60 text-base md:text-lg leading-relaxed"
          >
            Nekateri vaju bodo spravili iz cone udobja. Drugi vaju bodo
            spomnili, kako lepo je lahko nekaj povsem preprostega.
          </motion.p>
        </div>

        {/* Interactive Book */}
        <InteractiveBook />
      </div>
    </section>
  );
}
