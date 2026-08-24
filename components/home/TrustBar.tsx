"use client";

import { Lightbulb, Users, Image as ImageIcon, Gift } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "100 idej",
    description: "Za dneve, ko ne vesta, kaj bi počela.",
  },
  {
    icon: Users,
    title: "Ustvarjeno za dva",
    description: "Aktivnosti, namenjene skupnemu času.",
  },
  {
    icon: ImageIcon,
    title: "Vajini spomini",
    description: "Prostor za fotografije, zapiske in najlepše trenutke.",
  },
  {
    icon: Gift,
    title: "Popolno darilo",
    description: "Za partnerja, obletnico, poroko ali drug poseben trenutek.",
  },
];

export function TrustBar() {
  return (
    <section className="bg-warm-white border-y border-sand py-12 md:py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-walnut">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-espresso mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-soft-brown leading-relaxed max-w-[250px] mx-auto">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
