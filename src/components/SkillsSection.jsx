import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // UI/UX Design
  { name: "Figma", category: "uiux" },
  { name: "Design Systems", category: "uiux" },
  { name: "Prototyping", category: "uiux" },
  { name: "User Research", category: "uiux" },

  // Machine Learning & AI
  { name: "TensorFlow", category: "ml" },
  { name: "Keras", category: "ml" },
  { name: "scikit-learn", category: "ml" },
  { name: "PyTorch", category: "ml" },

  // Data Science & Analytics
  { name: "Excel", category: "data" },
  { name: "Tableau", category: "data" },
  { name: "MS Power BI", category: "data" },

  // Programming Languages
  { name: "Python", category: "language" },
  { name: "R Programming", category: "language" },
  { name: "Structured Query Language (SQL)", category: "language" },
  { name: "Java", category: "language" },
  { name: "C++", category: "language" },

  // Frontend
  { name: "HTML/CSS", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },

  // Backend
  { name: "PHP", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: "Flask", category: "backend" },

  // Digital Marketing
  { name: "SEO", category: "marketing" },
  { name: "SEM", category: "marketing" },
  { name: "SMM", category: "marketing" },
  { name: "Google Analytics", category: "marketing" },
  { name: "WordPress", category: "marketing" },
  
  // Tools & Cloud
  { name: "Git/GitHub", category: "tools" },
  { name: "VS Code", category: "tools" },
];

// ✅ Tambahkan semua kategori yang digunakan
const categories = [
  "all",
  "frontend",
  "backend",
  "UI/UX",
  "ML",
  "data",
  "language",
  "marketing",
  "tools"

];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-slate-800/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(120,119,198,0.05)_50%,transparent_70%)]"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 capitalize font-medium",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-slate-700/70 text-slate-300 hover:bg-slate-600/70 hover:text-white border border-slate-600/50 hover:border-slate-500/50"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50 hover:border-primary/40 hover:bg-slate-700/60 transition-all duration-300 card-hover group"
            >
              <div className="text-center">
                <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors duration-300 text-slate-200">
                  {skill.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
