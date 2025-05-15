export type Language = "en" | "es" | "pt" | "fr" | "de";

export interface Company {
  id: number;
  name: string;
  description: string;
  writingStyle: string;
  values: string[];
  languages: Language[];
}

export const companies: Record<number, Company> = {
  1: {
    id: 1,
    name: "SpatioTerra",
    description:
      "Passionate about harnessing multi-source spatial data to drive informed decision-making across industries. Our mission is to provide unparalleled geospatial insights through advanced analytics and AI, unifying diverse data sources for comprehensive actionable knowledge.",
    writingStyle: "Professional and technical",
    values: ["Innovation", "Quality", "Customer Focus"],
    languages: ["en", "es"],
  },
  2: {
    id: 2,
    name: "EcoSolutions",
    description: "Sustainable environmental services",
    writingStyle: "Eco-friendly and informative",
    values: ["Sustainability", "Environmental Care", "Community"],
    languages: ["en", "es", "fr"],
  },
  3: {
    id: 3,
    name: "AulaGIS",
    description:
      "AulaGIS es un portal E-Learning. Brinda cursos para todo aquel que quiera elevar su potencial y conocimientos GIS.",
    writingStyle: "Profesional y técnico",
    values: ["Sustainability", "Environmental Care", "Community"],
    languages: ["es"],
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
};
