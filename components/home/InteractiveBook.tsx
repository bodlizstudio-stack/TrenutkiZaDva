"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   CONFIGURATION
   ═══════════════════════════════════════════════ */
const TOTAL_SPREADS = 5;
const TURN_MS = 720;
const COMMIT_THRESHOLD = 0.3;

/* ═══════════════════════════════════════════════
   PAGE CONTENT — rendered as HTML for infinite sharpness
   ═══════════════════════════════════════════════ */
const PAGE_BG = "#f7f3ec";

function PaperBase({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`} style={{ backgroundColor: PAGE_BG }}>
      {/* Paper texture noise */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {children}
    </div>
  );
}

/* Decorative line */
function Line({ className = "" }: { className?: string }) {
  return <div className={`h-[1.5px] bg-[#b8a89a]/30 w-full ${className}`} />;
}

/* Camera icon for photo placeholders */
function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a09080" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-[10%] h-auto">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

/* ── Individual pages ── */

function PageBlank() {
  return <PaperBase>{null}</PaperBase>;
}

function PageTitle() {
  return (
    <PaperBase>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <p className="font-script text-[clamp(1.5rem,4cqi,3.5rem)] text-[#4a3f35] mb-2 leading-tight text-center">
          100 Nepozabnih trenutkov
        </p>
        <div className="w-[15%] h-px bg-[#c5b8a8] mt-[4%] mb-[3%]" />
        <p className="text-[clamp(0.6rem,1.2cqi,1rem)] uppercase tracking-[0.3em] text-[#9a8a7a]">
          Ustvarjajta zgodbo vajine ljubezni
        </p>
      </div>
    </PaperBase>
  );
}

function PageKazaloLeft() {
  return (
    <PaperBase>
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <p className="font-serif text-[clamp(0.8rem,1.4cqi,1.2rem)] text-[#7a6b5d] italic text-center leading-relaxed max-w-[80%]">
          &ldquo;Vsak par ima svojo zgodbo.<br />
          Včasih jo pišemo spontano,<br />
          drugič potrebujemo le majhen navdih.&rdquo;
        </p>
      </div>
    </PaperBase>
  );
}

function PageKazalo() {
  const sections = [
    { name: "Zima", pages: "1–9" },
    { name: "Pomlad", pages: "10–17" },
    { name: "Poletje", pages: "18–28" },
    { name: "Jesen", pages: "29–34" },
    { name: "Za vse letne čase", pages: "35–54" },
  ];
  const categories = [
    { name: "Kreativni trenutki", pages: "55–65" },
    { name: "Romantika brez meja", pages: "66–72" },
    { name: "Okusi in užitki", pages: "73–81" },
    { name: "Domača čarovnija", pages: "82–90" },
    { name: "Prostor za vajine ideje", pages: "91–100" },
  ];
  return (
    <PaperBase>
      <div className="absolute inset-0 flex flex-col justify-center px-[12%] py-[10%]">
        <h3 className="font-serif text-[clamp(1.2rem,2.8cqi,2.4rem)] text-[#3a3029] mb-[6%]">Kazalo</h3>
        <div className="space-y-[clamp(4px,1cqi,12px)]">
          {sections.map((s) => (
            <div key={s.name} className="flex justify-between items-baseline text-[clamp(0.65rem,1.2cqi,1rem)] text-[#5b4a3e]">
              <span>{s.name}</span>
              <span className="flex-1 border-b border-dotted border-[#c5b8a8] mx-2 mb-[2px]" />
              <span className="text-[#9a8a7a] tabular-nums">{s.pages}</span>
            </div>
          ))}
        </div>
        <div className="mt-[6%] space-y-[clamp(4px,1cqi,12px)]">
          {categories.map((c) => (
            <div key={c.name} className="flex justify-between items-baseline text-[clamp(0.65rem,1.2cqi,1rem)] text-[#5b4a3e]">
              <span>{c.name}</span>
              <span className="flex-1 border-b border-dotted border-[#c5b8a8] mx-2 mb-[2px]" />
              <span className="text-[#9a8a7a] tabular-nums">{c.pages}</span>
            </div>
          ))}
        </div>
      </div>
    </PaperBase>
  );
}

function PageQuoteLeft() {
  return (
    <PaperBase>
      <div className="absolute inset-0 flex items-end justify-center px-[10%] pb-[20%]">
        <p className="font-serif text-[clamp(0.75rem,1.3cqi,1.1rem)] text-[#5b4a3e] italic text-center leading-[1.8] max-w-[85%]">
          &ldquo;Ljubezen ni nekaj, kar najdeš. Ljubezen je nekaj,
          kar gradiš korak za korakom, trenutek za trenutkom.
          Ta knjiga ni le zbirka idej. Je vajin dnevnik,
          vajina pustolovščina in vajin spomin
          na vse, kar bosta skupaj ustvarila.&rdquo;
        </p>
      </div>
    </PaperBase>
  );
}

function PageToSvaMidva() {
  return (
    <PaperBase>
      <div className="absolute inset-0 flex flex-col items-center px-[8%] py-[6%]">
        <h3 className="font-serif text-[clamp(1.1rem,2.2cqi,1.8rem)] text-[#3a3029] mt-[4%] mb-1">To sva midva:</h3>
        <p className="text-[clamp(0.8rem,1.4cqi,1.2rem)] text-[#5b4a3e] mb-[5%] flex items-center">
          <span className="inline-block w-[15cqi] max-w-[80px] border-b border-[#b8a89a] mx-2" />
          &amp;
          <span className="inline-block w-[15cqi] max-w-[80px] border-b border-[#b8a89a] mx-2" />
        </p>

        {/* Photo placeholder */}
        <div className="w-[55%] aspect-[4/3] border-[1.5px] border-[#b8a89a]/50 rounded-lg flex items-center justify-center mb-[5%] bg-white/30">
          <CameraIcon />
        </div>

        <p className="font-serif text-[clamp(0.7rem,1.2cqi,1rem)] text-[#3a3029] font-semibold mb-[4%]">Midva v nekaj vrsticah:</p>
        <div className="w-[85%] space-y-[clamp(8px,2cqi,20px)]">
          <div>
            <p className="text-[clamp(0.55rem,1cqi,0.85rem)] text-[#5b4a3e] mb-[2%]">Kdaj sva začela najino zgodbo?</p>
            <Line />
          </div>
          <div>
            <p className="text-[clamp(0.55rem,1cqi,0.85rem)] text-[#5b4a3e] mb-[2%]">Kaj najraje skupaj počneva?</p>
            <Line />
          </div>
          <div>
            <p className="text-[clamp(0.55rem,1cqi,0.85rem)] text-[#5b4a3e] mb-[2%]">Kako bi opisala najino zvezo v treh besedah?</p>
            <div className="flex gap-[4%]">
              <Line className="flex-1" /><Line className="flex-1" /><Line className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    </PaperBase>
  );
}

function PageZima() {
  return (
    <PaperBase>
      <div className="absolute inset-0 flex items-end justify-center pb-[25%]">
        <h2 className="font-serif text-[clamp(1.8rem,3.5cqi,3.2rem)] text-[#3a3029] italic">Zima</h2>
      </div>
    </PaperBase>
  );
}

function PageActivity() {
  return (
    <PaperBase>
      <div className="absolute inset-0 flex flex-col px-[8%] py-[5%]">
        <p className="text-[clamp(0.5rem,0.9cqi,0.75rem)] uppercase tracking-[0.25em] text-[#8a7a6a] font-semibold text-center mb-[3%]">
          Prostor za vajine ideje
        </p>
        <Line className="mb-[2%]" />
        {/* Writing lines */}
        <div className="space-y-[clamp(8px,1.5cqi,16px)] mb-[3%]">
          <Line /><Line /><Line />
        </div>
        {/* Date & Location */}
        <div className="flex justify-between text-[clamp(0.45rem,0.8cqi,0.65rem)] text-[#8a7a6a] mb-[4%]">
          <span className="flex items-center">📅 DATUM: <span className="inline-block w-[6cqi] max-w-[60px] border-b border-[#b8a89a] ml-1" /></span>
          <span className="flex items-center">📍 LOKACIJA: <span className="inline-block w-[6cqi] max-w-[60px] border-b border-[#b8a89a] ml-1" /></span>
        </div>
        {/* Photo frame with actual image */}
        <div className="w-[70%] mx-auto aspect-[4/3] border-[1.5px] border-[#b8a89a]/50 rounded-lg overflow-hidden relative mb-[4%] p-1 bg-white/40">
          <div className="relative w-full h-full rounded-sm overflow-hidden">
            <Image
              src="/images/book-photo-1.jpg"
              alt="Skupni trenutek"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 300px"
            />
          </div>
        </div>
        <p className="text-[clamp(0.5rem,0.8cqi,0.7rem)] uppercase tracking-[0.2em] text-[#8a7a6a] font-semibold mb-[2%]">
          Najlepši trenutek:
        </p>
        <div className="space-y-[clamp(8px,1.5cqi,16px)] flex-1">
          <Line /><Line /><Line /><Line />
        </div>
        <p className="text-center text-[clamp(0.45rem,0.8cqi,0.6rem)] text-[#b8a89a] mt-auto">100</p>
      </div>
    </PaperBase>
  );
}

function PageClosingQuote() {
  return (
    <PaperBase>
      <div className="absolute inset-0 flex items-center justify-center px-[10%]">
        <p className="font-serif text-[clamp(0.75rem,1.3cqi,1.1rem)] text-[#5b4a3e] italic text-center leading-[1.8] max-w-[85%]">
          &ldquo;Ne gre za to, koliko zmenkov sta opravila.<br />
          Gre za to, koliko ljubezni sta vanje vložila.<br />
          Naj bo to le začetek vseh vajinih prihodnjih<br />
          poglavij.&rdquo;
        </p>
      </div>
    </PaperBase>
  );
}

function PagePromises() {
  return (
    <PaperBase>
      <div className="absolute inset-0 flex flex-col px-[10%] py-[6%]">
        <p className="font-serif text-[clamp(0.75rem,1.3cqi,1.1rem)] text-[#3a3029] font-semibold mb-[6%]">
          &ldquo;Ko bova čez leta listala to knjigo...&rdquo;
        </p>
        <div className="space-y-[clamp(12px,2.5cqi,24px)] flex-1">
          {[
            "Upava, da se bova spomnila",
            "Da se bova še vedno",
            "In da bo najina ljubezen ostala",
            "",
            "Obljubiva si, da si bova vedno vzela čas za:",
            "Da ne bova nikoli pozabila na:",
            "Da bova skupaj ustvarila še vsaj ___ novih zmenkov.",
          ].map((text, i) => (
            <div key={i}>
              {text ? (
                <>
                  <p className="text-[clamp(0.55rem,1cqi,0.85rem)] text-[#5b4a3e] mb-[1.5%]">{text}</p>
                  <Line />
                </>
              ) : (
                <div className="h-[clamp(4px,1cqi,10px)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </PaperBase>
  );
}

/* Page registry: [leftPage, rightPage] per spread */
const SPREADS: [() => ReactNode, () => ReactNode][] = [
  [PageBlank, PageTitle],
  [PageKazaloLeft, PageKazalo],
  [PageQuoteLeft, PageToSvaMidva],
  [PageZima, PageActivity],
  [PageClosingQuote, PagePromises],
];

/* ═══════════════════════════════════════════════
   SOUND — realistic paper page-turn via Web Audio
   ═══════════════════════════════════════════════ */
let pageTurnBuffer: AudioBuffer | null = null;
let audioCtx: AudioContext | null = null;
let activeSource: AudioBufferSourceNode | null = null;
let activeGain: GainNode | null = null;

// Pre-generate the audio buffer offline so it's instantly ready
async function generatePaperBuffer() {
  if (pageTurnBuffer) return;
  try {
    const rate = 44100;
    const dur = (TURN_MS / 1000); // exactly matches animation duration (0.72s)
    const OfflineCtx = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
    if (!OfflineCtx) return;

    const ctx = new OfflineCtx(2, Math.floor(rate * dur), rate);
    const len = ctx.length;
    const buf = ctx.createBuffer(2, len, rate);

    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const t = i / rate;
        let env = 0;
        // Perfect sync with physical animation:
        // 0-15%: Lift, 15-35%: Bend, 35-65%: Spine cross, 65-90%: Opposite side, 90-100%: Land
        const p = t / dur; // progress 0 to 1
        
        if (p < 0.15) env = (p / 0.15) * 0.1;
        else if (p < 0.35) env = 0.1 + ((p - 0.15) / 0.2) * 0.3;
        else if (p < 0.65) env = 0.4 + Math.sin(((p - 0.35) / 0.3) * Math.PI) * 0.6; // Peak at spine
        else if (p < 0.90) env = 0.4 - ((p - 0.65) / 0.25) * 0.3;
        else env = 0.1 - ((p - 0.90) / 0.1) * 0.1;

        d[i] = (Math.random() * 2 - 1) * env;
      }
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    // Filter to sound like premium paper
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1400;
    bp.Q.value = 0.5;

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 400;

    src.connect(bp).connect(hp).connect(ctx.destination);

    // Subtle thump for the landing (90-100%)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    const landTime = dur * 0.9;
    osc.frequency.setValueAtTime(70, landTime);
    osc.frequency.exponentialRampToValueAtTime(30, dur);
    
    oscGain.gain.setValueAtTime(0, 0);
    oscGain.gain.setValueAtTime(0, landTime);
    oscGain.gain.linearRampToValueAtTime(0.4, landTime + (dur * 0.02));
    oscGain.gain.exponentialRampToValueAtTime(0.01, dur);
    
    osc.connect(oscGain).connect(ctx.destination);

    src.start();
    osc.start(landTime);
    osc.stop(dur);

    pageTurnBuffer = await ctx.startRendering();
  } catch (e) {
    console.error("Audio generation failed", e);
  }
}

function playSyncedTurnSound(progressOffset = 0, dir: "fwd" | "bwd" = "fwd", volume = 0.25) {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  if (!pageTurnBuffer) return;

  // Cleanly fade out previous sound if rapidly turning
  if (activeSource && activeGain) {
    try {
      activeGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.02);
      activeSource.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  }

  const src = audioCtx.createBufferSource();
  src.buffer = pageTurnBuffer;

  // Stereo panning based on direction
  const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
  if (panner) {
    const startPan = dir === "fwd" ? 0.6 : -0.6;
    const endPan = dir === "fwd" ? -0.6 : 0.6;
    panner.pan.setValueAtTime(startPan, audioCtx.currentTime);
    panner.pan.linearRampToValueAtTime(endPan, audioCtx.currentTime + (TURN_MS / 1000));
  }

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);

  if (panner) {
    src.connect(panner).connect(gain).connect(audioCtx.destination);
  } else {
    src.connect(gain).connect(audioCtx.destination);
  }

  const offsetSeconds = progressOffset * (TURN_MS / 1000);
  src.start(0, offsetSeconds);

  activeSource = src;
  activeGain = gain;
}

/* ═══════════════════════════════════════════════
   SPINE COMPONENT
   ═══════════════════════════════════════════════ */
function BookSpine() {
  return (
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[14px] z-40 pointer-events-none">
      {/* Main crease shadow */}
      <div className="absolute inset-0 rounded-[1px]" style={{
        background: "linear-gradient(to right, rgba(0,0,0,0.03), rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.03))",
      }} />
      {/* Inner page curl shadow — left side */}
      <div className="absolute inset-y-0 -left-[20px] w-[20px]" style={{
        background: "linear-gradient(to left, rgba(0,0,0,0.08), transparent)",
      }} />
      {/* Inner page curl shadow — right side */}
      <div className="absolute inset-y-0 -right-[20px] w-[20px]" style={{
        background: "linear-gradient(to right, rgba(0,0,0,0.08), transparent)",
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE STACK THICKNESS
   ═══════════════════════════════════════════════ */
function PageStack({ side, count }: { side: "left" | "right"; count: number }) {
  const thickness = Math.min(count, 5);
  return (
    <div
      className={`absolute inset-y-[2px] w-[${Math.max(thickness, 1)}px] z-0 pointer-events-none ${
        side === "left" ? "left-0 rounded-l" : "right-0 rounded-r"
      }`}
      style={{
        width: `${Math.max(thickness, 1)}px`,
        background: side === "left"
          ? "linear-gradient(to right, #d8d0c4, #e8e0d6)"
          : "linear-gradient(to left, #d8d0c4, #e8e0d6)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export function InteractiveBook() {
  const [current, setCurrent] = useState(0);
  const [flip, setFlip] = useState<{ from: number; to: number; dir: "fwd" | "bwd" } | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const bookRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const dirRef = useRef<"fwd" | "bwd">("fwd");
  const rafRef = useRef(0);

  // Generate audio buffer on mount
  useEffect(() => {
    generatePaperBuffer();
  }, []);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  // Sound
  const triggerSound = useCallback((offset: number, dir: "fwd" | "bwd") => {
    if (soundOn) playSyncedTurnSound(offset, dir, 0.25);
  }, [soundOn]);

  // Animate helper
  const animateTo = useCallback(
    (startP: number, endP: number, from: number, to: number) => {
      const t0 = performance.now();
      const dist = Math.abs(endP - startP);
      const ms = reducedMotion ? 100 : TURN_MS * Math.max(dist, 0.25);

      const tick = (now: number) => {
        const elapsed = now - t0;
        const raw = Math.min(elapsed / ms, 1);
        const eased = 1 - Math.pow(1 - raw, 3);
        setProgress(startP + (endP - startP) * eased);
        if (raw < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          if (endP >= 0.5) setCurrent(to);
          setFlip(null);
          setProgress(0);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [reducedMotion]
  );

  // Turn (click / keyboard)
  const doTurn = useCallback(
    (dir: "fwd" | "bwd") => {
      if (flip) return;
      if (dir === "fwd" && current >= TOTAL_SPREADS - 1) return;
      if (dir === "bwd" && current <= 0) return;

      const from = current;
      const to = dir === "fwd" ? current + 1 : current - 1;
      triggerSound(0, dir);
      setFlip({ from, to, dir });
      setProgress(0);
      requestAnimationFrame(() => animateTo(0, 1, from, to));
    },
    [current, flip, triggerSound, animateTo]
  );

  // Pointer handlers
  const onDown = useCallback(
    (e: React.PointerEvent) => {
      if (flip) return;
      const rect = bookRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const dir: "fwd" | "bwd" = x > rect.width / 2 ? "fwd" : "bwd";
      if (dir === "fwd" && current >= TOTAL_SPREADS - 1) return;
      if (dir === "bwd" && current <= 0) return;

      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      startXRef.current = e.clientX;
      dirRef.current = dir;
      setDragging(true);
      cancelAnimationFrame(rafRef.current);

      const from = current;
      const to = dir === "fwd" ? current + 1 : current - 1;
      setFlip({ from, to, dir });
      setProgress(0);
    },
    [current, flip]
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !bookRef.current) return;
      const halfW = bookRef.current.getBoundingClientRect().width / 2;
      const dx = e.clientX - startXRef.current;
      const p = dirRef.current === "fwd"
        ? Math.max(0, Math.min(1, -dx / halfW))
        : Math.max(0, Math.min(1, dx / halfW));
      setProgress(p);
    },
    [dragging]
  );

  const onUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !flip) return;
      setDragging(false);
      const moved = Math.abs(e.clientX - startXRef.current);
      
      // Tap (barely moved)
      if (moved < 8) {
        triggerSound(progress, flip.dir);
        animateTo(progress, 1, flip.from, flip.to);
        return;
      }
      
      // Drag commit
      if (progress > COMMIT_THRESHOLD) {
        triggerSound(progress, flip.dir);
        animateTo(progress, 1, flip.from, flip.to);
      } else {
        // Revert drag (silently or extremely quiet)
        animateTo(progress, 0, flip.from, flip.to);
      }
    },
    [dragging, flip, progress, triggerSound, animateTo]
  );

  // Keyboard
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") doTurn("fwd");
      if (e.key === "ArrowLeft") doTurn("bwd");
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [doTurn]);

  // Hover tracking
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging || flip) { setHoverSide(null); return; }
    const rect = bookRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const edgeZone = rect.width * 0.15;
    if (x > rect.width - edgeZone && current < TOTAL_SPREADS - 1) {
      setHoverSide("right");
    } else if (x < edgeZone && current > 0) {
      setHoverSide("left");
    } else {
      setHoverSide(null);
    }
  }, [dragging, flip, current]);

  const onMouseLeave = useCallback(() => setHoverSide(null), []);

  /* ── Mobile pan state ── */
  const [mobilePan, setMobilePan] = useState<"left" | "right">("right");

  /* ── Determine visible pages ── */
  const LeftPage = SPREADS[current][0];
  const RightPage = SPREADS[current][1];

  let underLeftPage = LeftPage;
  let underRightPage = RightPage;
  let turnFrontPage: () => ReactNode = PageBlank;
  let turnBackPage: () => ReactNode = PageBlank;

  if (flip) {
    if (flip.dir === "fwd") {
      underLeftPage = SPREADS[flip.from][0];
      underRightPage = SPREADS[flip.to][1];
      turnFrontPage = SPREADS[flip.from][1];
      turnBackPage = SPREADS[flip.to][0];
    } else {
      underLeftPage = SPREADS[flip.to][0];
      underRightPage = SPREADS[flip.from][1];
      turnFrontPage = SPREADS[flip.from][0];
      turnBackPage = SPREADS[flip.to][1];
    }
  }

  /* ── 3D calculations ── */
  const angle = flip
    ? flip.dir === "fwd"
      ? -180 * progress
      : -180 + 180 * progress
    : 0;

  const shadowIntensity = Math.sin(progress * Math.PI);

  /* ── Corner hover lift ── */
  const cornerLift = hoverSide ? 4 : 0;
  const cornerSide = hoverSide;

  /* ── Mobile pan calculation ── */
  // On mobile (w-[185%]), the book is much wider than screen.
  // We translate the container so the left or right page is centered.
  // A left page is 50% of the book. We want to center the 0-50% portion on screen.
  const panTransform = `translateX(calc(${mobilePan === "left" ? "25%" : "-25%"}))`;

  return (
    <div className="w-full flex flex-col items-center overflow-hidden px-4 md:px-0">
      
      {/* Mobile Pan Toggle (Only visible on small screens) */}
      <div className="flex md:hidden bg-cream/10 rounded-full p-1 mb-6 border border-cream/20">
        <button
          onClick={() => setMobilePan("left")}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${mobilePan === "left" ? "bg-cream text-espresso" : "text-cream/70"}`}
        >
          Leva stran
        </button>
        <button
          onClick={() => setMobilePan("right")}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${mobilePan === "right" ? "bg-cream text-espresso" : "text-cream/70"}`}
        >
          Desna stran
        </button>
      </div>

      {/* Book Container Wrapper for Panning */}
      <div 
        className="w-[185%] sm:w-[140%] md:w-full transition-transform duration-500 ease-in-out md:!transform-none"
        style={{ transform: panTransform, containerType: 'inline-size' }}
      >
        <div
          ref={bookRef}
          className="relative w-full max-w-[1300px] mx-auto touch-none"
          style={{
            perspective: "2400px",
            aspectRatio: "1.7 / 1",
            cursor: dragging ? "grabbing" : (hoverSide ? "grab" : "default"),
          }}
          onPointerDown={onDown}
          onPointerMove={(e) => { onMove(e); onMouseMove(e); }}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          {/* Radial glow behind book */}
          <div className="absolute inset-[-15%] -z-30 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, rgba(245,230,210,0.08) 0%, transparent 70%)",
          }} />

          {/* Ambient shadow under book */}
          <div className="absolute inset-x-[3%] -bottom-[6px] h-[12px] -z-20 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.12)", filter: "blur(12px)", borderRadius: "50%" }}
          />
          {/* Secondary deeper shadow */}
          <div className="absolute inset-x-[8%] -bottom-[3px] h-[6px] -z-20 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.18)", filter: "blur(6px)", borderRadius: "50%" }}
          />

          {/* Hard cover back */}
          <div className="absolute inset-[-3px] rounded-[5px] -z-10 pointer-events-none"
            style={{ background: "linear-gradient(135deg, #7a6b5d, #6b5c4e, #7a6b5d)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
          />

          {/* ── LEFT PAGE ── */}
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden rounded-l-[4px]">
            {flip ? underLeftPage() : LeftPage()}
            {/* Corner hover effect */}
            {cornerSide === "left" && !flip && (
              <div className="absolute bottom-0 left-0 w-[60px] h-[60px] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.04) 50%)",
                  transform: `translateY(-${cornerLift}px)`,
                  transition: "transform 0.3s ease",
                }}
              />
            )}
          </div>

          {/* ── RIGHT PAGE ── */}
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-[4px]">
            {flip ? underRightPage() : RightPage()}
            {/* Corner hover effect */}
            {cornerSide === "right" && !flip && (
              <div className="absolute bottom-0 right-0 w-[60px] h-[60px] pointer-events-none"
                style={{
                  background: "linear-gradient(-135deg, transparent 50%, rgba(0,0,0,0.04) 50%)",
                  transform: `translateY(-${cornerLift}px)`,
                  transition: "transform 0.3s ease",
                }}
              />
            )}
          </div>

          {/* ── SPINE ── */}
          <BookSpine />

          {/* ── TURNING PAGE ── */}
          {flip && !reducedMotion && (
            <div
              className="absolute inset-y-0 w-1/2 z-20"
              style={{
                left: flip.dir === "fwd" ? "50%" : undefined,
                right: flip.dir === "bwd" ? "50%" : undefined,
                transformOrigin: flip.dir === "fwd" ? "left center" : "right center",
                transform: `rotateY(${angle}deg)`,
                transformStyle: "preserve-3d",
                transition: dragging ? "none" : undefined,
              }}
            >
              {/* Front face */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  borderRadius: flip.dir === "fwd" ? "0 4px 4px 0" : "4px 0 0 4px",
                }}
              >
                {turnFrontPage()}
                {/* Dynamic lighting on front */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: flip.dir === "fwd"
                    ? `linear-gradient(to left, rgba(255,255,255,${shadowIntensity * 0.08}), transparent 35%, rgba(0,0,0,${shadowIntensity * 0.12}))`
                    : `linear-gradient(to right, rgba(255,255,255,${shadowIntensity * 0.08}), transparent 35%, rgba(0,0,0,${shadowIntensity * 0.12}))`,
                }} />
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderRadius: flip.dir === "fwd" ? "4px 0 0 4px" : "0 4px 4px 0",
                }}
              >
                {turnBackPage()}
                {/* Dynamic lighting on back */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: flip.dir === "fwd"
                    ? `linear-gradient(to right, rgba(0,0,0,${shadowIntensity * 0.1}), transparent 50%)`
                    : `linear-gradient(to left, rgba(0,0,0,${shadowIntensity * 0.1}), transparent 50%)`,
                }} />
              </div>
            </div>
          )}

          {/* ── CAST SHADOW during turn ── */}
          {flip && (
            <div
              className="absolute inset-y-0 w-1/2 pointer-events-none z-10"
              style={{
                left: flip.dir === "fwd" ? 0 : "50%",
                background: `rgba(0,0,0,${shadowIntensity * 0.1})`,
                transition: dragging ? "none" : "background 0.15s",
              }}
            />
          )}

          {/* ── PAGE STACK ── */}
          <PageStack side="left" count={current} />
          <PageStack side="right" count={TOTAL_SPREADS - 1 - current} />
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div className="mt-8 md:mt-10 flex flex-col items-center">
        <div className="flex items-center gap-5">
          <button
            onClick={() => { doTurn("bwd"); setMobilePan("left"); }}
            disabled={current === 0 || !!flip}
            className={`p-3 rounded-full border border-cream/20 transition-all duration-200 ${
              current > 0 && !flip
                ? "hover:bg-cream/10 hover:scale-110 cursor-pointer text-cream/70 hover:text-cream"
                : "opacity-20 cursor-default text-cream/30"
            }`}
            aria-label="Prejšnja stran"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="tabular-nums min-w-[60px] text-center text-cream/80 text-sm font-serif">
            {current + 1} / {TOTAL_SPREADS}
          </span>

          <button
            onClick={() => { doTurn("fwd"); setMobilePan("right"); }}
            disabled={current === TOTAL_SPREADS - 1 || !!flip}
            className={`p-3 rounded-full border border-cream/20 transition-all duration-200 ${
              current < TOTAL_SPREADS - 1 && !flip
                ? "hover:bg-cream/10 hover:scale-110 cursor-pointer text-cream/70 hover:text-cream"
                : "opacity-20 cursor-default text-cream/30"
            }`}
            aria-label="Naslednja stran"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-3 rounded-full text-cream/40 hover:text-cream/70 transition-colors ml-2"
            aria-label={soundOn ? "Izklopi zvok" : "Vklopi zvok"}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
        <p className="mt-4 text-[10px] text-cream/40 tracking-[0.25em] uppercase hidden md:block">
          Klikni ali povleci za listanje
        </p>
      </div>
    </div>
  );
}
