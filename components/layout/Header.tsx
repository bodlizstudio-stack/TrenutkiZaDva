"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Domov", href: "/" },
  { name: "100 nepozabnih trenutkov", href: "/100-nepozabnih-trenutkov" },
  { name: "Trgovina", href: "/trgovina" },
  { name: "O nas", href: "/o-nas" },
  { name: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { getCartCount, setIsOpen } = useCartStore();
  const cartCount = getCartCount();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled || isMobileMenuOpen ? "bg-cream border-sand py-4 shadow-sm" : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2">
          <span className="font-script text-2xl md:text-3xl text-espresso">
            Trenutki za dva
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-terracotta relative group",
                  isActive ? "text-espresso" : "text-soft-brown"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-terracotta rounded-full origin-left transition-transform duration-300 ease-out",
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <Button asChild variant="default" className="rounded-full px-6">
            <Link href="/100-nepozabnih-trenutkov">Naroči knjigo</Link>
          </Button>
          
          <div className="flex items-center gap-3 border-l border-sand pl-5">
            <button 
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-espresso hover:text-terracotta transition-colors"
              aria-label="Košarica"
            >
              <ShoppingCart className="w-5 h-5" />
              {isMounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-cream bg-terracotta rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden relative z-10">
          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-espresso"
            aria-label="Košarica"
          >
            <ShoppingCart className="w-5 h-5" />
            {isMounted && cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-cream bg-terracotta rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-espresso"
            aria-label="Meni"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 bg-cream border-b border-sand shadow-lg lg:hidden flex flex-col px-6 py-8 transition-transform duration-300 ease-in-out origin-top",
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-6 text-center text-xl font-serif">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-espresso hover:text-terracotta transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto pt-8 flex flex-col gap-4 border-t border-sand">
          <Button asChild size="lg" className="w-full">
            <Link href="/100-nepozabnih-trenutkov">Naroči knjigo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}


