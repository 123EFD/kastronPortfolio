import { useState } from "react";
import { ExternalLink, Github, ArrowRight, Gamepad2, Brain, Sparkles, Activity, Terminal } from "lucide-react";

const projects = [
    {
        id: 1,
        missionId: "MISSION_01",
        title: "Flappytron",
        status: "COMPLETED",
        description: "An arcade evolution of the classic Flappy Bird built with Unity. Engineered responsive input polling, audio triggers, custom physics curves, and high-score persistence.",
        image: "/projects/flappytron.png?v=2",
        tags: ["Unity", "C#", "Game Physics", "Audio FX"],
        demoUrl: "https://khytron.itch.io/kastron",
        githubUrl: "https://github.com/Khytron/Flappytron.git",
        icon: Gamepad2
    },
    {
        id: 2,
        missionId: "MISSION_02",
        title: "Booklonian AI",
        status: "LIVE",
        description: "An AI-driven learning companion platform enabling users to create topic-focused conversational agents. Integrated Clerk authentication, Supabase backend, and Vapi audio pipelines.",
        image: "/projects/booklonian.png?v=2",
        tags: ["Next.js", "React", "Clerk", "Supabase", "Vapi", "Tailwind"],
        demoUrl: "https://booklovian.vercel.app/",
        githubUrl: "https://github.com/123EFD/saas-app.git",
        icon: Brain
    },
    {
        id: 3,
        missionId: "MISSION_03",
        title: "Student Performance Predictor",
        status: "IN_PROGRESS",
        description: "Predictive academic evaluation suite utilizing automated PDF parsing and Groq LLM inference to extract student records and generate customized curriculum interventions.",
        image: "/projects/student-predictor.png?v=2",
        tags: ["Python", "FastAPI", "HuggingFace", "Groq LLM", "Flutter"],
        demoUrl: "https://suluh-ai.vercel.app/",
        githubUrl: "https://github.com/123EFD/recommender-api",
        icon: Sparkles
    },
    {
        id: 4,
        missionId: "MISSION_04",
        title: "Glance-mini",
        status: "COMPLETED",
        description: "Lightweight, real-time system contention diagnostic tool built in Python. Identifies CPU/memory spikes and process I/O bottlenecks with automated incident snapshots, streaming metrics via WebSockets and Prometheus.",
        image: null,
        tags: ["Python", "FastAPI", "WebSockets", "Prometheus", "Docker", "asyncio"],
        demoUrl: null,
        githubUrl: "https://github.com/123EFD/glances-mini",
        icon: Activity,
        fallbackBadge: "SYS_TELEMETRY // V1.0",
        fallbackSubtitle: "REAL-TIME CONTENTION ENGINE",
        metrics: [
            { label: "CPU%", val: "LIVE" },
            { label: "WS", val: "STREAM" },
            { label: "PROM", val: "9090" }
        ]
    },
];

// Retro 8-bit System Cover component with fallback handling
const ProjectCover = ({ project }) => {
    const [imgError, setImgError] = useState(false);
    const IconComponent = project.icon || Terminal;

    if (project.image && !imgError) {
        return (
            <div className="h-52 overflow-hidden border-b-2 border-border bg-muted/40 relative">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 pointer-events-none retro-scanlines opacity-25" />
            </div>
        );
    }

    // Default 8-bit / Terminal Front Page cover when no image is present or fails to load
    return (
        <div className="h-52 overflow-hidden border-b-2 border-border bg-card relative flex flex-col justify-between p-4 font-mono select-none">
            {/* Retro grid background & scanlines */}
            <div className="absolute inset-0 retro-grid-bg opacity-30" />
            <div className="absolute inset-0 retro-scanlines opacity-30 pointer-events-none" />

            {/* Top diagnostic status bar */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-muted-foreground border-b border-border/50 pb-2">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse inline-block" />
                    <span className="font-pixel text-[10px] text-primary">
                        [{project.fallbackBadge || "SYS_DIAGNOSTIC // ONLINE"}]
                    </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline">
                    HOST_PROCESS_OK
                </span>
            </div>

            {/* Center: System Glyph + Title */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2 text-center">
                <div className="w-12 h-12 border-2 border-primary bg-secondary/80 flex items-center justify-center shadow-[3px_3px_0px_0px_var(--primary)] mb-2 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <IconComponent className="w-6 h-6 text-primary animate-pulse-subtle" />
                </div>
                <div className="font-pixel text-base text-foreground tracking-wider uppercase">
                    &gt; {project.title} &lt;
                </div>
                <div className="text-[10px] font-mono text-muted-foreground tracking-tight mt-0.5">
                    [{project.fallbackSubtitle || "SYSTEM_SERVICE_MODULE"}]
                </div>
            </div>

            {/* Bottom telemetry readouts */}
            <div className="relative z-10 grid grid-cols-3 gap-1.5 text-[10px] border-t border-border/50 pt-2 text-center">
                {(project.metrics || [
                    { label: "STATUS", val: "ACTIVE" },
                    { label: "STREAM", val: "ONLINE" },
                    { label: "TELEMETRY", val: "OK" }
                ]).map((metric, i) => (
                    <div key={i} className="bg-secondary/60 border border-border/70 py-1 px-1 flex flex-col items-center justify-center">
                        <span className="text-[9px] text-muted-foreground font-mono uppercase">{metric.label}</span>
                        <span className="text-primary font-pixel text-[11px] font-bold">{metric.val}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

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

                            {/* Image Preview / Default 8-bit Front Page */}
                            <ProjectCover project={project} />

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
                                    <div className="flex gap-2.5 flex-wrap">
                                        {project.demoUrl && (
                                            <a 
                                                href={project.demoUrl}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="pixel-btn pixel-btn-primary py-1.5 px-3 text-xs gap-1.5"
                                            >
                                                <ExternalLink size={14} />
                                                [LIVE_DEMO]
                                            </a>
                                        )}

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