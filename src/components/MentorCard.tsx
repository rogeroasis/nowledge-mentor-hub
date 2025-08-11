
import React from "react";
import { Button } from "@/components/ui/button";

type MentorCardProps = {
  name: string;
  company: string;
  role: string;
  bio: string;
  imgSrc?: string;
  onBook?: () => void;
};

const MentorCard = ({ name, company, role, bio, imgSrc, onBook }: MentorCardProps) => (
  <article className="flex flex-col md:flex-row gap-6 p-6 border border-border rounded-lg shadow bg-card text-card-foreground">
    {imgSrc ? (
      <img
        src={imgSrc}
        alt={name}
        loading="lazy"
        className="h-32 w-32 rounded-full object-cover border-2 border-border"
      />
    ) : (
      <div className="h-32 w-32 rounded-full bg-muted border-2 border-border flex items-center justify-center font-bold text-lg">
        {name[0]}
      </div>
    )}
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-extrabold mb-1">{name}</h3>
        <span className="font-semibold text-muted-foreground">{role}</span>
        <div className="text-sm font-medium text-muted-foreground">{company}</div>
        <p className="mt-3">{bio}</p>
      </div>
      <Button
        onClick={onBook}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded font-bold shadow-sm hover:bg-primary/90"
      >
        Book one hour
      </Button>
    </div>
  </article>
);

export default MentorCard;
