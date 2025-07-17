import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // UI/UX Design
  { name: "Figma", level: 85, category: "uiux" },
  { name: "Design Systems", level: 80, category: "uiux" },
  { name: "Prototyping", level: 80, category: "uiux" },
  { name: "User Research", level: 75, category: "uiux" },

  // Machine Learning & AI
  { name: "TensorFlow", level: 80, category: "ml" },
  { name: "Keras", level: 80, category: "ml" },
  { name: "scikit-learn", level: 75, category: "ml" },
  { name: "PyTorch", level: 70, category: "ml" },

  // Data Science & Analytics
  { name: "Excel", level: 85, category: "data" },
  { name: "Tableau", level: 75, category: "data" },
  { name: "MS Power BI", level: 70, category: "data" },

  // Programming Languages
  { name: "Python", level: 90, category: "language" },
  { name: "R Programming", level: 20, category: "language" },
  { name: "Structured Query Language (SQL)", level: 80, category: "language" },
  { name: "Java", level: 75, category: "language" },
  { name: "C++", level: 70, category: "language" },

  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 40, category: "frontend" },

  // Backend
  { name: "PHP", level: 80, category: "backend" },
  { name: "Laravel", level: 75, category: "backend" },
  { name: "Flask", level: 70, category: "backend" },


  // Digital Marketing
  { name: "SEO", level: 75, category: "marketing" },
  { name: "SEM", level: 75, category: "marketing" },
  { name: "SMM", level: 75, category: "marketing" },
  { name: "Google Analytics", level: 75, category: "marketing" },
  { name: "WordPress", level: 70, category: "marketing" },
  
  // Tools & Cloud
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },


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
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
