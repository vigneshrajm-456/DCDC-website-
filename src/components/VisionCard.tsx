import React from "react";
import BentoCard from "./BentoCard";

export default function VisionCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard
      id="bento-vision-card"
      title="Vision"
      text="Cultivating the next generation of digital pioneers, creative directors, and systems builders. Our vision is to serve as an academic incubator where curious minds transform emerging technological paradigms into meaningful, beautiful, and accessible everyday interfaces."
      imageUrl="https://lh3.googleusercontent.com/d/15xKzVUlbqWhHNUksV9MuwHtw6g6rgwdK"
      imageSources={[
        "https://lh3.googleusercontent.com/d/15xKzVUlbqWhHNUksV9MuwHtw6g6rgwdK",
        "https://drive.google.com/uc?export=view&id=15xKzVUlbqWhHNUksV9MuwHtw6g6rgwdK"
      ]}
      fallbackUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
      imageAlt="DCDC Vision of digital communication and futuristic designs, academic teamwork"
      className={className}
      imagePositionClass="object-[center_25%]"
      tag="Vision Canvas"
    >
      {/* Super clean backdrop wrapper with no distracting technical labels */}
    </BentoCard>
  );
}
