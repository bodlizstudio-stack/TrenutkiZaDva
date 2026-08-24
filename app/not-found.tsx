import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-[120px] font-serif text-sand/60 font-bold leading-none mb-4">404</div>
      <h1 className="text-3xl md:text-4xl font-serif text-espresso mb-4">
        Ta trenutek se je očitno izgubil.
      </h1>
      <p className="text-soft-brown mb-8 max-w-md">
        Stran, ki jo iščeta, ne obstaja ali pa je bila premaknjena. Morda je čas za nov trenutek.
      </p>
      <Button asChild size="lg">
        <Link href="/">Nazaj na domačo stran</Link>
      </Button>
    </div>
  );
}
