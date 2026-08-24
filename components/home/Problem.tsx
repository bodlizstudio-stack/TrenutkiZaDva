"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Problem() {
  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-[52px] leading-tight text-espresso text-balance"
          >
            Kolikokrat si rečeta: »Morala bi več časa preživeti skupaj.«?
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl text-soft-brown max-w-2xl mx-auto leading-relaxed"
          >
            <p>
              Vsakdan hitro postane rutina. Služba, obveznosti, telefoni in vprašanje: <br className="hidden md:block"/>
              <span className="italic">»Kaj pa bova danes počela?«</span>
            </p>
            <p>
              Knjiga 100 nepozabnih trenutkov je nastala zato, da vama ni treba vedno znova iskati idej.
            </p>
            <p className="font-medium text-espresso">
              Odpreta knjigo, izbereta naslednje doživetje in ustvarita nov skupni spomin.
            </p>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 md:mt-24 aspect-[16/9] md:aspect-[2/1] max-w-5xl mx-auto rounded-2xl bg-sand/30 overflow-hidden relative"
        >
           <Image 
             src="/images/book-photo-4.jpg" 
             alt="Odprta knjiga" 
             fill 
             className="object-cover"
           />
        </motion.div>
      </div>
    </section>
  );
}
