"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-cream"></div>;
  }
  
  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen pt-32 text-center">
        <h1 className="text-3xl font-serif text-espresso mb-4">Vajina košarica je prazna</h1>
        <Button asChild>
          <Link href="/100-nepozabnih-trenutkov">Nazaj na nakupovanje</Link>
        </Button>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, origin: window.location.origin }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Nekaj je šlo narobe. Poskusite ponovno.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Napaka pri povezavi s plačilnim sistemom.');
      setIsSubmitting(false);
    }
  };

  const total = getCartTotal();
  const shipping = 3.50; // Mock shipping

  return (
    <div className="bg-cream min-h-screen pt-12 pb-32">
      <div className="container-wide max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <Link href="/" className="text-3xl font-serif text-espresso hover:opacity-80">
            Trenutki za dva
          </Link>
          <h1 className="text-2xl mt-4 font-serif text-espresso">Zaključek naročila</h1>
        </div>

        <div className="bg-warm-white rounded-xl p-8 border border-sand">
          <h2 className="text-xl font-serif text-espresso mb-6 border-b border-sand pb-4">Povzetek</h2>
          
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-16 h-20 relative flex-shrink-0">
                  <div className="absolute inset-0 bg-sand rounded-md overflow-hidden border border-sand/50">
                   {item.image && (
                     <Image 
                       src={item.image} 
                       alt={item.name} 
                       fill 
                       className="object-cover"
                     />
                   )}
                  </div>
                   <span className="absolute -top-2 -right-2 w-5 h-5 bg-espresso text-cream text-xs rounded-full flex items-center justify-center font-medium z-20">
                     {item.quantity}
                   </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-espresso">{item.name}</h4>
                  <p className="text-sm text-soft-brown mt-1">{(item.price * item.quantity).toFixed(2)} €</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-sand pt-6 space-y-3 text-base">
            <div className="flex justify-between text-soft-brown">
              <span>Vmesna vsota</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-soft-brown">
              <span>Dostava</span>
              <span>{shipping.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-espresso font-medium text-xl pt-6 border-t border-sand">
              <span>Skupaj</span>
              <span className="font-serif">{(total + shipping).toFixed(2)} €</span>
            </div>
          </div>

          <div className="mt-10">
            <Button onClick={handleCheckout} size="lg" className="w-full h-14 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Pripravljam varno blagajno..." : "Nadaljuj na plačilo"}
            </Button>
            
            <div className="mt-6 flex flex-col items-center gap-3 text-soft-brown">
              <div className="flex items-center gap-2 text-sm font-medium text-espresso/80">
                <ShieldCheck className="w-5 h-5 text-sage" />
                <span>Varno in šifrirano plačilo</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> Mastercard</span>
                <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> Visa</span>
                <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> PayPal</span>
                <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> Apple Pay</span>
                <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> Google Pay</span>
              </div>
              
              <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                <Lock className="w-3 h-3" />
                <span>Powered by Stripe</span>
              </div>
            </div>
            
            <p className="text-center text-xs text-soft-brown/70 mt-6 max-w-sm mx-auto">
              Naslov za dostavo in kontaktne podatke boste vnesli v naslednjem koraku na varni Stripe strani.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
