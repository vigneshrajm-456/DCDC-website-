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
      fallbackUrl="/images/workshop/IMG-20260121-WA0090.jpg"
      imageAlt="DCDC Legacy milestones, glowing pathways"
      className={className}
      imagePositionClass="object-[center_30%]"
      tag="Established 2016"
    />
  );
}