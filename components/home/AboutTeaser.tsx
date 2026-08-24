"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function AboutTeaser() {
  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square md:aspect-[4/5] rounded-2xl bg-sand/30 overflow-hidden relative"
          >
             <Image 
               src="/images/book-photo-2.jpg"
               alt="Knjiga Trenutki za dva"
               fill
               className="object-cover"
             />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-espresso leading-tight text-balance mb-2">
              Za trenutke, ki jih vsakdan prehitro pozabi.
            </h2>
            <div className="space-y-4 text-soft-brown text-lg leading-relaxed">
              <p>
                Trenutki za dva so nastali iz preproste ideje — da za lep odnos niso vedno potrebne velike geste.
              </p>
              <p>
                Pogosto največ pomenijo majhni trenutki, ko si zavestno vzamemo čas drug za drugega. Zato ustvarjamo izdelke, ki pare spodbujajo k skupnim izkušnjam, novim pogovorom in spominom, ki jih lahko odnesejo s seboj.
              </p>
              <p className="font-serif text-xl text-espresso italic pt-4 pb-2">
                "Naš cilj ni napolniti polic. Naš cilj je napolniti vajino zgodbo."
              </p>
            </div>
            <div className="pt-4">
              <Button asChild variant="outline" className="border-espresso text-espresso hover:bg-espresso hover:text-cream">
                <Link href="/o-nas">Preberita našo zgodbo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
