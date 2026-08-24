import Link from "next/link";
import { Mail, Phone, Lock, CreditCard } from "lucide-react";

const footerLinks = {
  odkrij: [
    { name: "100 nepozabnih trenutkov", href: "/100-nepozabnih-trenutkov" },
    { name: "Kako deluje", href: "/#kako-deluje" },
    { name: "O nas", href: "/o-nas" },
  ],
  pomoc: [
    { name: "Kontakt", href: "/kontakt" },
    { name: "Dostava", href: "/dostava" },
    { name: "Vračila", href: "/vracila" },
    { name: "Pogosta vprašanja", href: "/pogosta-vprasanja" },
  ],
  informacije: [
    { name: "Splošni pogoji poslovanja", href: "/splosni-pogoji" },
    { name: "Politika zasebnosti", href: "/politika-zasebnosti" },
    { name: "Piškotki", href: "/piskotki" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-espresso text-cream pt-16 pb-8">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-4">
            <h3 className="text-4xl font-script text-warm-white">Trenutki za dva</h3>
            <p className="text-cream/80 text-sm max-w-xs leading-relaxed">
              Ideje, doživetja in spomini za dva.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-warm-white">Odkrij</h4>
            <ul className="space-y-3">
              {footerLinks.odkrij.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-cream/70 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium text-warm-white mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@trenutkizadva.si" className="text-cream/70 hover:text-warm-white transition-colors text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@trenutkizadva.si
                </a>
              </li>
              <li>
                <a href="tel:+38641123456" className="text-cream/70 hover:text-warm-white transition-colors text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (+386) 41 123 456
                </a>
              </li>
              <li className="flex gap-4 pt-4">
                <a href="#" className="text-cream/70 hover:text-warm-white transition-colors text-sm" aria-label="Instagram">
                  Instagram
                </a>
                <span className="text-cream/30">|</span>
                <a href="#" className="text-cream/70 hover:text-warm-white transition-colors text-sm" aria-label="Facebook">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-warm-white">Informacije</h4>
            <ul className="space-y-3">
              {footerLinks.informacije.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-cream/70 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-cream/50 gap-6 md:gap-4">
          <p>© {new Date().getFullYear()} Trenutki za dva. Vse pravice pridržane.</p>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            {/* Thematic monochromatic payment logos */}
            <div className="flex items-center gap-4 text-cream/60">
              {/* Visa text styled logo */}
              <span className="font-bold italic text-lg tracking-tighter select-none">VISA</span>
              
              {/* Amex text styled logo */}
              <div className="border border-cream/40 rounded px-1.5 py-0.5 select-none">
                <span className="font-bold text-[10px] tracking-wider block leading-none pt-0.5">AMEX</span>
              </div>
              
              {/* Mastercard SVG logo */}
              <svg viewBox="0 0 24 16" className="w-8 h-5 fill-current opacity-90 select-none" aria-label="Mastercard">
                <circle cx="7.5" cy="8" r="7.5" />
                <circle cx="16.5" cy="8" r="7.5" fillOpacity="0.7" />
              </svg>
              
              {/* PayPal text styled logo */}
              <span className="font-bold italic text-base select-none">PayPal</span>
            </div>
            
            <div className="flex items-center gap-1.5 opacity-60">
              <Lock className="w-3 h-3" />
              <span>Powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
