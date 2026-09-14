import { useState } from "react";
import { cn } from "@/lib/utils";
import { Layers, Terminal, Sparkles, Database, Wrench } from "lucide-react";

const skillCategories = [
    { id: "all", label: "[ALL_ITEMS]" },
    { id: "frontend", label: "[FRONTEND]" },
    { id: "backend", label: "[BACKEND]" },
    { id: "ai_data", label: "[AI_&_DATA]" },
    { id: "tools", label: "[TOOLS_&_ENGINE]" },
];

const skills = [
    // Frontend
    { name: "React", category: "frontend", desc: "Component Architecture, Hooks, State", tag: "CORE" },
    { name: "TypeScript", category: "frontend", desc: "Strict Types, Interfaces, Tooling", tag: "CORE" },
    { name: "Next.js", category: "frontend", desc: "SSR, SSG, App Router, Full-Stack", tag: "FRAMEWORK" },
    { name: "Tailwind CSS", category: "frontend", desc: "Design Systems, Responsive, v4", tag: "STYLING" },
    { name: "HTML5 / Canvas", category: "frontend", desc: "Semantic Markup, 2D Rendering", tag: "GRAPHICS" },
    { name: "JavaScript (ES6+)", category: "frontend", desc: "Async/Await, DOM, Event Loop", tag: "CORE" },

    // Backend
    { name: "Node.js / Express", category: "backend", desc: "RESTful APIs, Middleware, Auth", tag: "RUNTIME" },
    { name: "Python / FastAPI", category: "backend", desc: "Async Endpoints, Pydantic, ML", tag: "BACKEND" },
    { name: "PostgreSQL", category: "backend", desc: "Relational Modeling, Indexing, SQL", tag: "DATABASE" },
    { name: "Supabase", category: "backend", desc: "Auth, RLS, Edge Functions, Postgres", tag: "BAAS" },

    // AI & Data
    { name: "Groq & HuggingFace", category: "ai_data", desc: "LLM Inference, Model Pipelines", tag: "AI_LLM" },
    { name: "PDF AI Analysis", category: "ai_data", desc: "Document Parsing, Information Extraction", tag: "PIPELINE" },
    { name: "Streamlit / Plotly", category: "ai_data", desc: "Data Viz, Interactive Dashboards", tag: "ANALYTICS" },

    // Tools & Game Engines
    { name: "Unity & C#", category: "tools", desc: "2D/3D Game Loops, Physics, Mechanics", tag: "GAME_DEV" },
    { name: "Git & GitHub", category: "tools", desc: "Branching, CI/CD, Content Pipelines", tag: "DEV_OPS" },
    { name: "Docker", category: "tools", desc: "Containerization, Microservices", tag: "DEVOPS" },
    { name: "Vite / Modern Tooling", category: "tools", desc: "Fast Bundling, Polyfills, Plugins", tag: "BUILD" },
];

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    );

    return (
        <section id="skills" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="pixel-badge mb-3 text-primary">
                        [ INVENTORY_MATRIX // TECH_TREE ]
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-pixel">
                        SKILLS &amp; <span className="text-primary">&lt;LOADOUT&gt;</span>
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
                        Equipped tools, frameworks, and runtime environments deployed across production &amp; side projects.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-12">
                    {skillCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "pixel-btn text-xs py-1.5 px-3 font-pixel uppercase transition-all",
                                activeCategory === cat.id
                                    ? "pixel-btn-primary"
                                    : "bg-secondary text-foreground hover:bg-muted"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* 8-bit Inventory Slot Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSkills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className="pixel-box p-4 text-left transition-all hover:-translate-y-1 group"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-[10px] text-muted-foreground uppercase">
                                    SLOT_{String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="font-pixel text-[10px] px-1.5 py-0.5 bg-primary/10 border border-border text-primary">
                                    {skill.tag}
                                </span>
                            </div>

                            <h3 className="font-pixel text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                {skill.name}
                            </h3>

                            <p className="font-mono text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                {skill.desc}
                            </p>

                            {/* 8-bit retro power pips */}
                            <div className="flex items-center gap-1 mt-3 pt-2.5 border-t border-border/50 text-[10px] text-primary">
                                <span>■</span>
                                <span>■</span>
                                <span>■</span>
                                <span className="text-muted-foreground/40">■</span>
                                <span className="ml-auto font-mono text-[10px] text-muted-foreground">READY</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};