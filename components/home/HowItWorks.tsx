"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Izberita naslednji zmenek",
    desc: "Odprita knjigo in izberita eno izmed 100 idej."
  },
  {
    num: "02",
    title: "Doživita ga skupaj",
    desc: "Od preprostih trenutkov doma do kreativnih in drugačnih doživetij."
  },
  {
    num: "03",
    title: "Shranita spomin",
    desc: "Dodajta datum, lokacijo, fotografijo in zapišita najlepši trenutek."
  }
];

export function HowItWorks() {
  return (
    <section id="kako-deluje" className="py-24 bg-warm-white border-t border-sand">
      <div className="container-wide">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl text-espresso text-balance"
          >
            Kako nastanejo nepozabni trenutki?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="text-[120px] font-serif leading-none text-sand/40 font-bold mb-[-40px] select-none group-hover:text-sand/60 transition-colors">
                {step.num}
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-serif font-medium text-espresso">
                  {step.title}
                </h3>
                <p className="text-soft-brown leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
