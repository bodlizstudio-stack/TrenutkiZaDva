"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Kaj vsebuje knjiga 100 nepozabnih trenutkov?",
    a: "Knjiga vsebuje 100 različnih idej za zmenke in skupne aktivnosti. Zmenki so razdeljeni na različne kategorije – od preprostih domačih do bolj kreativnih in pustolovskih doživetij. Ob vsaki aktivnosti je tudi prostor za vajine zapiske in fotografije."
  },
  {
    q: "Za kakšne pare je knjiga primerna?",
    a: "Primerna je tako za nove pare, ki se šele spoznavajo, kot za dolgoletne pare ali zakonce, ki želijo razbiti rutino in ustvariti nove skupne spomine."
  },
  {
    q: "Ali so aktivnosti zahtevne?",
    a: "Ne, aktivnosti so zasnovane tako, da so dostopne vsem. Nekatere zahtevajo malo več načrtovanja (npr. izlet), večina pa so preprosta doživetja, ki jih lahko izvedeta doma ali v bližini."
  },
  {
    q: "Ali lahko aktivnosti izvajava v poljubnem vrstnem redu?",
    a: "Seveda! Knjigo lahko odpreta na katerikoli strani ali pa si zmenke izbirata glede na trenutno razpoloženje, vreme in prosti čas."
  },
  {
    q: "Ali je knjiga primerna za darilo?",
    a: "Knjiga je popolno darilo! Pogosto se podarja ob obletnicah, porokah, Valentinovem, ali pa kar tako – kot presenečenje partnerju."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-warm-white border-y border-sand">
      <div className="container-wide max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-espresso"
          >
            Pogosta vprašanja
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-sand rounded-xl bg-cream overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-medium text-espresso pr-4">{faq.q}</span>
                  <span className="text-terracotta flex-shrink-0">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-soft-brown">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
