import React from "react";
import BentoCard from "./BentoCard";
import { Sparkles, Layout } from "lucide-react";

export default function DesignChallengesCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard
      id="bento-challenges-card"
      title="Project Innovation"
      text="We encourage students to apply their technical knowledge through innovative projects that address real-world challenges. From embedded systems and IoT applications to communication technologies and emerging innovations, our members collaborate, design, and build solutions that strengthen practical engineering skills and creativity."
      imageUrl="https://lh3.googleusercontent.com/d/12mZAvboIN9sXwqCN9ExvKH_s9auWdiSi"
      imageSources={[
        "https://lh3.googleusercontent.com/d/12mZAvboIN9sXwqCN9ExvKH_s9auWdiSi",
        "https://drive.google.com/uc?export=view&id=12mZAvboIN9sXwqCN9ExvKH_s9auWdiSi"
      ]}
      fallbackUrl="/images/workshop/IMG-20260121-WA0082.jpg"
      imageAlt="UI wireframe, sketch, and product mockups visually aligned"
      className={className}
      imagePositionClass="object-[center_20%]"
      tag="Innovation"
    >
      {/* Super clean backdrop wrapper with no distracting technical labels */}
    </BentoCard>
  );
}
