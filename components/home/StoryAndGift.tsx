"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function StoryAndGift() {
  return (
    <section className="bg-cream">
      {/* Product Story */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-sand/20">
            <Image 
              src="/images/book-photo-2.jpg"
              alt="Lifestyle fotografija"
              fill
              className="object-cover opacity-60"
            />
        </div>
        <div className="relative container-wide py-32 md:py-48 flex justify-center md:justify-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl bg-warm-white/95 backdrop-blur-md p-10 md:p-14 rounded-2xl shadow-sm border border-sand"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-espresso leading-tight mb-6">
              Čez nekaj let ne bosta štela več zmenkov. Listala bosta spomine.
            </h2>
            <div className="space-y-4 text-soft-brown mb-8 leading-relaxed">
              <p>
                »100 nepozabnih trenutkov« ni knjiga, ki jo prebereš in odložiš. Z vsakim doživetjem postaja bolj vajina.
              </p>
              <p>
                Fotografije, zapiski, datumi in majhne zgodbe jo sčasoma spremenijo v osebno kroniko vajinega odnosa.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/100-nepozabnih-trenutkov">Začniva najino zgodbo</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Gift Section */}
      <div className="container-wide py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-espresso mb-6"
          >
            Darilo, ki ga ne odložita v predal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-soft-brown mb-10 max-w-2xl mx-auto"
          >
            Namesto še ene stvari podari 100 razlogov, da skupaj nekaj doživita. Popolno darilo za obletnico, Valentinovo, poroko ali rojstni dan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="lg" variant="outline" className="border-espresso text-espresso hover:bg-espresso hover:text-cream">
              <Link href="/100-nepozabnih-trenutkov">Podari 100 trenutkov</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
