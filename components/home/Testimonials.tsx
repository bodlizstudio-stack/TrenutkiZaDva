"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "M. & T.",
    text: "Končno nekaj, kar naju je po dolgem času spravilo iz rutine. Nekateri zmenki so res preprosti, a ravno to sva potrebovala."
  },
  {
    id: 2,
    name: "A. P.",
    text: "Kupila sem za obletnico. Fant je bil najprej skeptičen, zdaj pa on prvi predlaga, da odpreva knjigo!"
  },
  {
    id: 3,
    name: "N. & J.",
    text: "Najlepši del je, ko po zmenku zalepiva sliko. Nastaja prava mala knjiga spominov."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-warm-white border-y border-sand">
      <div className="container-wide">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-espresso"
          >
            Trenutki drugih parov
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-cream p-8 rounded-2xl border border-sand/50 shadow-sm"
            >
              <div className="flex gap-1 mb-4 text-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-soft-brown italic mb-6 leading-relaxed">"{t.text}"</p>
              <p className="text-sm font-medium text-espresso uppercase tracking-wider">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
