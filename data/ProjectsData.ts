// src/data/ProjectsData.ts

export interface Project {
  id: string;
  title: string;
  descriptionKey: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "talentbridge",
    title: "TalentBridge",
    descriptionKey: "talentbridge",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl"],
    image: "/projects/talentbridge.png",
    liveUrl: "https://talent-bridge-initiative.netlify.app/en",
    githubUrl: "https://github.com/Yussif20/talent-bridge",
    featured: true,
  },
  {
    id: "fly-kitchen",
    title: "Fly-Kitchen",
    descriptionKey: "flyKitchen",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl"],
    image: "/projects/fly-kitchen.png",
    liveUrl: "https://fly-kitchen.vercel.app/en",
    githubUrl: "https://github.com/Yussif20/fly-kitchen",
    featured: true,
  },
  {
    id: "marketio",
    title: "Marketio",
    descriptionKey: "marketio",
    technologies: ["React.js", "Tailwind CSS", "Firebase", "Stripe", "i18n"],
    image: "/projects/marketio.jpg",
    liveUrl: "https://marketio-hpgs.vercel.app/",
    githubUrl: "https://github.com/Yussif20/Marketio",
    featured: true,
  },
  {
    id: "melco",
    title: "Melco",
    descriptionKey: "melco",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "EmailJS",
    ],
    image: "/projects/melco.png",
    liveUrl: "https://melco.vercel.app/en",
    githubUrl: "https://github.com/Yussif20/melco",
    featured: false,
  },
  {
    id: "golden-metal",
    title: "Golden Metal",
    descriptionKey: "goldenMetal",
    technologies: ["React.js", "EmailJS", "Tailwind CSS", "i18n"],
    image: "/projects/golden-metal.png",
    liveUrl: "https://goldenmetal-co.com/",
    githubUrl: "https://github.com/Yussif20/golden-metal",
    featured: false,
  },
  {
    id: "mars-esim",
    title: "Mars-eSIM",
    descriptionKey: "marsEsim",
    technologies: ["React.js", "Tailwind CSS", "i18n"],
    image: "/projects/mars-esim.png",
    liveUrl: "https://mars-lemon.vercel.app/",
    githubUrl: "https://github.com/Yussif20/Mars",
    featured: false,
  },
];
