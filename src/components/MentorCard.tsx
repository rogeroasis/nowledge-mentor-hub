
import React from "react";

type MentorCardProps = {
  name: string;
  company: string;
  role: string;
  bio: string;
  imgSrc?: string;
  onBook?: () => void;
};

const MentorCard = ({ name, company, role, bio, imgSrc, onBook }: MentorCardProps) => (
  <article className="flex flex-col md:flex-row gap-6 p-6 border border-black rounded-lg shadow bg-white">
    {imgSrc ? (
      <img
        src={imgSrc}
        alt={name}
        className="h-32 w-32 rounded-full object-cover border-2 border-black"
      />
    ) : (
      <div className="h-32 w-32 rounded-full bg-gray-200 border-2 border-black flex items-center justify-center font-bold text-lg">
        {name[0]}
      </div>
    )}
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-extrabold mb-1">{name}</h3>
        <span className="font-semibold text-black/70">{role}</span>
        <div className="text-sm font-medium text-black/70">{company}</div>
        <p className="mt-3 text-black">{bio}</p>
      </div>
      <button
        onClick={onBook}
        className="mt-4 px-4 py-2 bg-black text-white rounded shadow-[2px_2px_0_0_#000] hover:shadow-none font-bold"
      >
        Book one hour
      </button>
    </div>
  </article>
);

export default MentorCard;
