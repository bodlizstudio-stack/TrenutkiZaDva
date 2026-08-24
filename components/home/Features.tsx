"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "100 idej za zmenke",
    desc: "Nikoli več »Kaj bi danes počela?«.",
  },
  {
    title: "Različna doživetja",
    desc: "Od majhnih trenutkov do aktivnosti, ki jih mogoče sama nikoli ne bi izbrala.",
  },
  {
    title: "Prostor za fotografije",
    desc: "Vsak zmenek lahko postane del vajine zgodbe.",
  },
  {
    title: "Vajini zapisi",
    desc: "Datum, lokacija in najljubši trenutek.",
  },
  {
    title: "Knjiga spominov",
    desc: "Ko zaključita zadnjo aktivnost, za vama ostane nekaj veliko bolj vrednega kot samo knjiga.",
  }
];

export function Features() {
  return (
    <section className="py-24 bg-cream border-t border-sand">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-espresso">
            Kaj vaju čaka v knjigi?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-2xl bg-warm-white border border-sand/60 shadow-sm flex flex-col justify-center ${index === 4 ? 'lg:col-span-2' : ''}`}
            >
              <h3 className="text-xl font-serif font-medium text-espresso mb-3">
                {feature.title}
              </h3>
              <p className="text-soft-brown leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
