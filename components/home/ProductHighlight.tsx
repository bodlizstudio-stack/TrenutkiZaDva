"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, MapPin, ZoomIn, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { useState } from "react";

const trustBadges = [
  { icon: ShieldCheck, text: "Varno plačilo" },
  { icon: Truck, text: "Hitra dostava" },
  { icon: RotateCcw, text: "Možnost vračila" },
  { icon: MapPin, text: "Pošiljanje po Sloveniji" },
];

const galleryImages = [
  "/images/book-photo-1.jpg",
  "/images/book-photo-6.jpg",
  "/images/book-photo-3.jpg",
  "/images/book-photo-4.jpg",
  "/images/book-photo-5.jpg",
  "/images/book-photo-7.jpg",
  "/images/book-photo-8.jpg",
  "/images/book-photo-9.jpg",
];

export function ProductHighlight() {
  const addItem = useCartStore((state) => state.addItem);
  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: "100-trenutkov-book",
      name: "100 nepozabnih trenutkov",
      price: 34.99,
      quantity: 1,
      image: "/images/book-photo-1.jpg"
    });
  };

  return (
    <>
      <section id="izdelek" className="py-24 md:py-32 bg-cream">
        <div className="container-wide">
          <div className="bg-warm-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm border border-sand">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 w-full overflow-hidden"
              >
                {/* Main Image */}
                <div 
                  className="aspect-[3/2] rounded-2xl bg-sand/30 flex items-center justify-center relative overflow-hidden border border-sand/50 cursor-zoom-in group"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <Image 
                    src={activeImage}
                    alt="100 nepozabnih trenutkov knjiga"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                      <ZoomIn className="w-6 h-6 text-espresso" />
                    </div>
                  </div>
                </div>
                
                {/* Thumbnails (Scrollable) */}
                <div className="flex overflow-x-auto gap-3 pb-2 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                  {galleryImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 w-24 aspect-[3/2] relative rounded-lg overflow-hidden border-2 transition-all snap-start ${activeImage === img ? 'border-espresso' : 'border-transparent hover:border-sand'}`}
                    >
                      <Image 
                        src={img}
                        alt={`Slika izdelka ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-5xl font-serif text-espresso mb-4">
                    100 nepozabnih trenutkov
                  </h2>
                  <p className="text-xl text-soft-brown leading-relaxed">
                    Knjiga, ki ne stoji na polici. Knjiga, ki jo doživita.
                  </p>
                </div>

                <div className="text-4xl font-serif text-espresso">
                  34,99 €
                </div>

                <Button onClick={handleAddToCart} size="lg" className="w-full text-lg h-16">
                  Dodaj v košarico — 34,99 €
                </Button>

                <div className="grid grid-cols-2 gap-y-4 pt-6 border-t border-sand">
                  {trustBadges.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-soft-brown">
                        <Icon className="w-4 h-4 text-sage" />
                        <span>{badge.text}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-[3/2] max-h-[85vh] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={activeImage}
                alt="Povečana slika izdelka"
                fill
                className="object-contain"
              />
            </motion.div>
            
            {/* Lightbox Thumbnails */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
              {galleryImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(img);
                  }}
                  className={`flex-shrink-0 w-16 aspect-[3/2] relative rounded overflow-hidden border-2 transition-all ${activeImage === img ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <Image 
                    src={img}
                    alt={`Sličica ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
