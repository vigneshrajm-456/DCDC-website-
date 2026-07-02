import React from "react";
import BentoCard from "./BentoCard";
import { Users, ShieldAlert } from "lucide-react";

export default function IndustryConnectCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard
      id="bento-industry-card"
      title="Achievements"
      text="Our club takes pride in the accomplishments of its members through technical competitions, hackathons, project exhibitions, and academic achievements. These milestones reflect our commitment to innovation, teamwork, and continuous learning while inspiring students to strive for excellence."
      imageUrl="https://lh3.googleusercontent.com/d/1Dpr4T8PmCYvK71zuW-UkeV466LCDNbZ7"
      imageSources={[
        "https://lh3.googleusercontent.com/d/1Dpr4T8PmCYvK71zuW-UkeV466LCDNbZ7",
        "https://drive.google.com/uc?export=view&id=1Dpr4T8PmCYvK71zuW-UkeV466LCDNbZ7"
      ]}
      fallbackUrl="/images/workshop/IMG-20260121-WA0092.jpg"
      imageAlt="Technology conference networking with experts"
      className={className}
      imagePositionClass="object-[center_20%]"
      tag="Achievements"
    >
      {/* Super clean backdrop wrapper with no distracting technical labels */}
    </BentoCard>
  );
}
