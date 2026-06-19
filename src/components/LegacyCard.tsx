import React from "react";
import BentoCard from "./BentoCard";
import { History, Milestone } from "lucide-react";

export default function LegacyCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard
      id="bento-legacy-card"
      title="Legacy"
      text="Pioneering student-led digital excellence at the intersection of media, design, and computing. Since 2016, our active community has successfully nurtured over a thousand creators, designed award-winning products, and continually redefined the boundaries of peer-to-peer technical mentorship."
      imageUrl="/assets/legacy.jpg"
      imageSources={[
        "/assets/legacy.jpg",
        "/assets/legacy.png",
        "/assets/legacy.jpeg",
        "/assets/legacy.webp"
      ]}
      fallbackUrl="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=1200"
      imageAlt="DCDC Legacy milestones, glowing pathways"
      className={className}
      imagePositionClass="object-[center_30%]"
      tag="Established 2016"
    >
      {/* Futuristic glow milestones path */}
      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
        <div className="w-[80%] flex justify-between items-center relative gap-2 mt-4">
          <div className="absolute h-[1px] inset-x-0 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 opacity-60" />
          
          {[2016, 2019, 2022, 2026].map((yr) => (
            <div key={yr} className="relative z-10 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-slate-300 bg-black/80 px-1.5 py-0.5 rounded border border-white/10 mb-2">
                {yr}
              </span>
              <span className="w-4 h-4 rounded-full bg-[#111118] border border-pink-500/60 shadow-[0_0_8px_rgba(236,72,153,0.5)] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
