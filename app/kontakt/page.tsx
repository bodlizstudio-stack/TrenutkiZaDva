"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Napaka pri pošiljanju sporočila");
      }

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg("Prišlo je do napake. Prosimo, poskusite znova.");
    }
  };

  return (
    <div className="bg-cream min-h-screen pt-20 pb-32">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-espresso mb-6">
            Sva tukaj, če naju potrebuješ.
          </h1>
          <p className="text-lg text-soft-brown">
            Imaš vprašanje o knjigi, naročilu ali dostavi? Piši nam in odgovorili ti bomo v najkrajšem možnem času.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col space-y-2 p-6 bg-cream rounded-2xl">
                <span className="text-sm font-semibold text-terracotta uppercase tracking-widest">E-pošta</span>
                <a href="mailto:info@trenutkizadva.si" className="text-lg md:text-xl font-serif text-espresso hover:text-walnut transition-colors">
                  info@trenutkizadva.si
                </a>
                <span className="text-sm text-soft-brown">Odgovorimo v 24 urah</span>
              </div>
              
              <div className="flex flex-col space-y-2 p-6 bg-cream rounded-2xl">
                <span className="text-sm font-semibold text-terracotta uppercase tracking-widest">Telefon</span>
                <a href="tel:+38641123456" className="text-lg md:text-xl font-serif text-espresso hover:text-walnut transition-colors">
                  (+386) 41 123 456
                </a>
                <span className="text-sm text-soft-brown">Pon - Pet, 9:00 - 16:00</span>
              </div>
            </div>
          </div>

          <div className="bg-warm-white p-8 rounded-2xl border border-sand shadow-sm">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-sage/20 text-sage rounded-full flex items-center justify-center text-2xl font-bold mb-4">✓</div>
                <h3 className="text-2xl font-serif text-espresso">Hvala!</h3>
                <p className="text-soft-brown">
                  Tvoje sporočilo je na poti. Odgovorimo ti v najkrajšem možnem času.
                </p>
                <p className="text-xs text-soft-brown/70 mt-2">
                  (Demo: Pravkar ste na vaš e-mail prejeli avtomatski odgovor z demonstracijo računa in zahvalo za naročilo!)
                </p>
                <Button onClick={() => setStatus("idle")} variant="outline" className="mt-8">
                  Pošlji novo sporočilo
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-espresso mb-2">Ime in priimek *</label>
                  <input required type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-espresso/20" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-espresso mb-2">Vaša E-pošta *</label>
                  <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-espresso/20" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-espresso mb-2">Zadeva</label>
                  <select id="subject" name="subject" className="w-full px-4 py-3 rounded-lg border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-espresso/20">
                    <option>Vprašanje o izdelku</option>
                    <option>Moje naročilo</option>
                    <option>Dostava</option>
                    <option>Vračilo</option>
                    <option>Sodelovanje</option>
                    <option>Drugo</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-espresso mb-2">Sporočilo *</label>
                  <textarea required id="message" name="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-espresso/20"></textarea>
                </div>
                <div className="flex items-start gap-3">
                  <input required type="checkbox" id="consent" className="mt-1" />
                  <label htmlFor="consent" className="text-sm text-soft-brown leading-snug">
                    Strinjam se, da se moji podatki uporabijo za odgovor na moje sporočilo.
                  </label>
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Pošiljam..." : "Pošlji sporočilo"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
