import React from "react";
import BentoCard from "./BentoCard";
import { GraduationCap, Award } from "lucide-react";

export default function WorkshopsCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard
      id="bento-workshops-card"
      title="Workshops"
      text="Immersive, student-driven technical bootcamps tackling real-world design, development, and engineering problems. Our interactive workshops provide participants with the practical skillsets and creative confidence needed to master modern production-ready toolchains and frame premium user experiences."
      imageUrl="https://lh3.googleusercontent.com/d/1nn_Y0D-4DfZE5FMcZLHYOnzB5l5rbdFI"
      imageSources={[
        "https://lh3.googleusercontent.com/d/1nn_Y0D-4DfZE5FMcZLHYOnzB5l5rbdFI",
        "https://drive.google.com/uc?export=view&id=1nn_Y0D-4DfZE5FMcZLHYOnzB5l5rbdFI"
      ]}
      fallbackUrl="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&q=80&w=1200"
      imageAlt="Students collaborating inside creative technology workshop lab environment"
      className={className}
      imagePositionClass="object-[center_25%]"
      tag="Active Bootcamps"
    >
      {/* Super clean backdrop wrapper with no distracting technical labels */}
    </BentoCard>
  );
}
