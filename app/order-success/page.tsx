"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function OrderSuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Clear cart upon successful order
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-cream min-h-screen pt-32 text-center">
      <div className="container-wide max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-serif text-espresso">Hvala za vaše naročilo!</h1>
        <p className="text-lg text-soft-brown">
          Vaše naročilo je bilo uspešno plačano in potrjeno. 
          Podatke o naročilu smo vam poslali na vaš e-poštni naslov.
        </p>
        <div className="pt-8">
          <Button asChild>
            <Link href="/">Vrnitev na prvo stran</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
