import { ExternalLink, Github, ArrowRight, Gamepad2, Database, Brain, Sparkles } from "lucide-react";

const projects = [
    {
        id: 1,
        missionId: "MISSION_01",
        title: "Flappytron",
        status: "COMPLETED",
        description: "An arcade evolution of the classic Flappy Bird built with Unity. Engineered responsive input polling, audio triggers, custom physics curves, and high-score persistence.",
        image: "/projects/project1.png",
        tags: ["Unity", "C#", "Game Physics", "Audio FX"],
        demoUrl: "https://khytron.itch.io/kastron",
        githubUrl: "https://github.com/Khytron/Flappytron.git",
        icon: Gamepad2
    },
    {
        id: 2,
        missionId: "MISSION_02",
        title: "Financial Dashboard",
        status: "DEPLOYED",
        description: "A data analytics platform providing granular personal financial intelligence. Built with Streamlit and Plotly for high-throughput visualization and cashflow projections.",
        image: "/projects/project2.png",
        tags: ["Python", "Streamlit", "Plotly", "Data Analytics"],
        demoUrl: "https://kas-financialdashboard.streamlit.app/",
        githubUrl: "https://github.com/123EFD/FINANCEAPP.git",
        icon: Database
    },
    {
        id: 3,
        missionId: "MISSION_03",
        title: "Booklonian AI",
        status: "LIVE",
        description: "An AI-driven learning companion platform enabling users to create topic-focused conversational agents. Integrated Clerk authentication, Supabase backend, and Vapi audio pipelines.",
        image: "/projects/project3.png",
        tags: ["Next.js", "React", "Clerk", "Supabase", "Vapi", "Tailwind"],
        demoUrl: "https://saas-pi-inky-49.vercel.app/",
        githubUrl: "https://github.com/123EFD/saas-app.git",
        icon: Brain
    },
    {
        id: 4,
        missionId: "MISSION_04",
        title: "Student Performance Predictor",
        status: "IN_PROGRESS",
        description: "Predictive academic evaluation suite utilizing automated PDF parsing and Groq LLM inference to extract student records and generate customized curriculum interventions.",
        image: "/projects/project4.png",
        tags: ["Python", "FastAPI", "HuggingFace", "Groq LLM", "Flutter"],
        demoUrl: "https://recommender-api-ten.vercel.app/",
        githubUrl: "https://github.com/123EFD/recommender-api",
        icon: Sparkles
    },
];

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="pixel-badge mb-3 text-primary">
                        [ DEPLOYED_SOFTWARE // QUEST_LOG ]
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-pixel">
                        FEATURED <span className="text-primary">&lt;PROJECTS&gt;</span>
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
                        Production applications, experimental prototypes, and interactive systems built from scratch.
                    </p>
                </div>

                {/* 2x2 Grid of 8-bit Project Cartridges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="pixel-box flex flex-col group transition-transform duration-200 hover:-translate-y-1.5"
                        >
                            {/* Retro Header Bar */}
                            <div className="bg-secondary px-4 py-2 border-b-2 border-border flex items-center justify-between font-mono text-xs">
                                <span className="font-pixel text-primary font-bold">
                                    [{project.missionId}]
                                </span>
                                <span className={`font-pixel text-[10px] px-1.5 py-0.5 border border-border ${
                                    project.status === 'IN_PROGRESS' 
                                        ? 'bg-amber-500/20 text-amber-500' 
                                        : 'bg-emerald-500/20 text-emerald-500'
                                }`}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Image Preview with 8-bit border */}
                            <div className="h-52 overflow-hidden border-b-2 border-border bg-muted/40 relative">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Content Body */}
                            <div className="p-6 flex flex-col flex-grow text-left">
                                <h3 className="text-xl font-bold font-pixel mb-2 text-foreground group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="font-mono text-xs md:text-sm text-muted-foreground mb-5 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                {/* Tag Badges */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {project.tags.map((tag) => (
                                        <span 
                                            key={tag} 
                                            className="font-mono text-[11px] px-2 py-0.5 bg-secondary border border-border text-foreground font-medium"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-3 border-t-2 border-border/60 mt-auto">
                                    <div className="flex gap-2.5">
                                        <a 
                                            href={project.demoUrl}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pixel-btn pixel-btn-primary py-1.5 px-3 text-xs gap-1.5"
                                        >
                                            <ExternalLink size={14} />
                                            [LIVE_DEMO]
                                        </a>

                                        <a 
                                            href={project.githubUrl}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pixel-btn py-1.5 px-3 text-xs gap-1.5"
                                        >
                                            <Github size={14} />
                                            [SOURCE]
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom GitHub Archive CTA */}
                <div className="text-center mt-14">
                    <a 
                        className="pixel-btn pixel-btn-primary gap-2 text-sm" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        href="https://github.com/123EFD"
                    >
                        [EXPLORE_ALL_REPOSITORIES_ON_GITHUB]
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};