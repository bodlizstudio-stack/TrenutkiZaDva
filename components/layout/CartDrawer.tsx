"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Image from "next/image";

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-espresso/20 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-cream z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-sand">
          <h2 className="text-xl font-serif font-medium flex items-center gap-2 text-espresso">
            <ShoppingBag className="w-5 h-5" />
            Vajina košarica
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-soft-brown hover:text-espresso transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-soft-brown">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>V vajini košarici še ni novih trenutkov.</p>
              <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                <Link href="/100-nepozabnih-trenutkov">Odkrij knjigo</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-sand rounded-md overflow-hidden relative flex-shrink-0">
                    {/* Placeholder for image */}
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-walnut/20" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-espresso leading-snug">{item.name}</h3>
                      <p className="text-sm text-soft-brown mt-1">{(item.price).toFixed(2)} €</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-sand rounded-md">
                        <button 
                          className="p-1 px-2 text-soft-brown hover:text-espresso"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm px-2 font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          className="p-1 px-2 text-soft-brown hover:text-espresso"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-soft-brown underline underline-offset-2 hover:text-terracotta"
                      >
                        Odstrani
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-sand bg-warm-white space-y-4">
            <div className="flex justify-between items-center text-espresso">
              <span className="font-medium">Skupaj</span>
              <span className="font-medium text-lg">{getCartTotal().toFixed(2)} €</span>
            </div>
            <p className="text-xs text-soft-brown text-center">
              Poštnina se obračuna na blagajni.
            </p>
            <Button asChild className="w-full" size="lg" onClick={() => setIsOpen(false)}>
              <Link href="/blagajna">Nadaljuj na blagajno</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
