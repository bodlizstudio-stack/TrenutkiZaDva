"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const productImages = [
    "/images/book-photo-1.jpg",
    "/images/book-photo-6.jpg",
    "/images/book-photo-3.jpg",
    "/images/book-photo-4.jpg",
  ];
  
  const [activeImage, setActiveImage] = useState(productImages[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div className="pt-12 pb-24 md:pt-20 md:pb-32 bg-cream min-h-screen">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-serif text-espresso mb-6">
              Trgovina
            </h1>
            <p className="text-lg md:text-xl text-soft-brown">
              Izberite vajino knjigo in se podajta na pot ustvarjanja nepozabnih spominov.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            <div className="group flex flex-col bg-warm-white rounded-2xl overflow-hidden border border-sand shadow-sm hover:shadow-md transition-shadow p-2">
              
              <div 
                className="relative aspect-[3/2] w-full rounded-xl overflow-hidden bg-sand/20 block cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image 
                  src={activeImage}
                  alt="Knjiga 100 nepozabnih trenutkov"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                    <ZoomIn className="w-5 h-5 text-espresso" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-2 px-1">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveImage(img)}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-[3/2] rounded-md overflow-hidden border-2 transition-all ${activeImage === img ? 'border-espresso' : 'border-transparent hover:border-sand'}`}
                  >
                    <Image 
                      src={img}
                      alt={`Sličica izdelka ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="p-6 flex flex-col flex-grow text-center mt-2">
                <span className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-3">Knjiga za pare</span>
                <Link href="/100-nepozabnih-trenutkov" className="hover:text-terracotta transition-colors">
                  <h3 className="text-2xl font-serif text-espresso mb-4">100 nepozabnih trenutkov</h3>
                </Link>
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-sand/50">
                  <span className="text-xl font-medium text-espresso">34,99 €</span>
                  <Button asChild size="sm">
                    <Link href="/100-nepozabnih-trenutkov">Naroči zdaj</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="group flex flex-col bg-warm-white rounded-2xl overflow-hidden border border-sand shadow-sm opacity-60 p-2">
              <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden bg-sand/30 flex items-center justify-center">
                <span className="font-serif text-xl text-walnut/50">Kmalu na voljo</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2 px-1 opacity-50">
                 <div className="aspect-[3/2] bg-sand/20 rounded-md"></div>
                 <div className="aspect-[3/2] bg-sand/20 rounded-md"></div>
                 <div className="aspect-[3/2] bg-sand/20 rounded-md"></div>
                 <div className="aspect-[3/2] bg-sand/20 rounded-md"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow text-center mt-2">
                <span className="text-xs uppercase tracking-widest text-soft-brown font-semibold mb-3">Darilni set</span>
                <h3 className="text-2xl font-serif text-espresso mb-4">Knjiga + Dodatki</h3>
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-sand/50">
                  <span className="text-xl font-medium text-soft-brown">--</span>
                  <Button variant="outline" size="sm" disabled>Kmalu</Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

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
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
              {productImages.map((img, idx) => (
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
