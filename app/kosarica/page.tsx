"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { Minus, Plus, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen pt-32 pb-32 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="w-16 h-16 text-espresso/20 mb-6" />
        <h1 className="text-3xl font-serif text-espresso mb-4">Vajina košarica je prazna</h1>
        <p className="text-soft-brown mb-8">V vajini košarici še ni novih trenutkov.</p>
        <Button asChild size="lg">
          <Link href="/100-nepozabnih-trenutkov">Odkrij knjigo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pt-20 pb-32">
      <div className="container-wide max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-serif text-espresso mb-10 border-b border-sand pb-6">Košarica</h1>
        
        <div className="space-y-8 mb-10">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-warm-white p-4 rounded-xl border border-sand">
              <div className="w-24 h-32 bg-sand rounded-md overflow-hidden relative flex-shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-walnut/20" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-medium text-espresso">{item.name}</h3>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-soft-brown underline hover:text-terracotta"
                >
                  Odstrani
                </button>
              </div>

              <div className="flex flex-col sm:items-end gap-4 sm:w-32">
                <div className="text-lg font-medium text-espresso">{(item.price * item.quantity).toFixed(2)} €</div>
                <div className="flex items-center border border-sand rounded-md bg-white">
                  <button 
                    className="p-2 text-soft-brown hover:text-espresso"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button 
                    className="p-2 text-soft-brown hover:text-espresso"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-warm-white border border-sand rounded-xl p-8 max-w-md ml-auto">
          <div className="flex justify-between items-center mb-6 text-espresso">
            <span className="font-medium">Skupaj</span>
            <span className="text-2xl font-serif">{getCartTotal().toFixed(2)} €</span>
          </div>
          
          <Button asChild size="lg" className="w-full mb-4">
            <Link href="/blagajna">Nadaljuj na blagajno</Link>
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-sage">
            <ShieldCheck className="w-4 h-4" />
            <span>Varno plačilo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
