import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "O nas | Trenutki za dva",
  description: "Za trenutke, ki jih vsakdan prehitro pozabi.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen pt-20 pb-32">
      <div className="container-wide max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif text-espresso mb-12 text-center text-balance">
          Za trenutke, ki jih vsakdan prehitro pozabi.
        </h1>
        
        <div className="aspect-video w-full rounded-2xl bg-sand/30 overflow-hidden relative mb-16">
          <Image 
            src="/images/book-photo-2.jpg"
            alt="Knjiga Trenutki za dva"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-12 text-lg md:text-xl text-soft-brown leading-relaxed">
          <div>
            <p className="mb-6">
              Trenutki za dva so nastali iz preproste ideje — da za lep odnos niso vedno potrebne velike geste.
            </p>
            <p>
              Pogosto največ pomenijo majhni trenutki, ko si zavestno vzamemo čas drug za drugega. 
              V svetu, kjer nenehno hitimo in smo vedno povezani s tehnologijo, hitro pozabimo 
              na resnično povezanost s tistimi, ki nam pomenijo največ.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-espresso mb-6">Naše poslanstvo</h2>
            <p className="mb-6">
              Ustvarjati premišljene izdelke, ki pare spodbujajo, da se za trenutek ustavijo, 
              odložijo vsakdan in ponovno namenijo čas drug drugemu.
            </p>
            <ul className="space-y-4 pl-6 border-l-2 border-terracotta/30">
              <li>Nova doživetja, ki razbijejo rutino.</li>
              <li>Globlji pogovori namesto površnega klepeta.</li>
              <li>Iskrena bližina in skupni rituali.</li>
              <li>Spomini, ki ostanejo zabeleženi.</li>
            </ul>
          </div>

          <div className="bg-warm-white p-8 md:p-12 rounded-2xl border border-sand text-center italic font-serif text-2xl md:text-3xl text-espresso text-balance shadow-sm">
            »Naš cilj ni napolniti polic. Naš cilj je napolniti vajino zgodbo.«
          </div>
        </div>
      </div>
    </div>
  );
}
