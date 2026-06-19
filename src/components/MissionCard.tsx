import React from "react";
import BentoCard from "./BentoCard";
import { Cpu, Atom } from "lucide-react";

export default function MissionCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard
      id="bento-mission-card"
      title="Mission"
      text="Fostering friction-free collaboration by bridging the gap between analytical engineering and expressive design. We empower diverse student teams to co-create user-centric solutions that merge human-centered digital aesthetics with robust, scalable technology systems."
      imageUrl="https://lh3.googleusercontent.com/d/1hA-4LUPAHlkNwgN1JUuJm3iUr-rMlhDW"
      imageSources={[
        "https://lh3.googleusercontent.com/d/1hA-4LUPAHlkNwgN1JUuJm3iUr-rMlhDW",
        "https://drive.google.com/uc?export=view&id=1hA-4LUPAHlkNwgN1JUuJm3iUr-rMlhDW"
      ]}
      fallbackUrl="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200"
      imageAlt="DCDC Mission collaborative engineering and creative design workspace"
      className={className}
      imagePositionClass="object-[center_2%]"
      tag="Collaboration Core"
    >
      {/* Super clean backdrop wrapper with no distracting technical labels */}
    </BentoCard>
  );
}
