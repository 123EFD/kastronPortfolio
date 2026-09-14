import { Code, Cpu, Layout, FileText, Send } from "lucide-react";

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="pixel-badge mb-3 text-primary">
                        [ PLAYER_PROFILE // DATA_SHEET ]
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-pixel">
                        ABOUT <span className="text-primary">&lt;ME&gt;</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Terminal Bio Window */}
                    <div className="pixel-box">
                        {/* Retro Window Header */}
                        <div className="bg-secondary px-4 py-2 border-b-2 border-border flex items-center justify-between">
                            <span className="font-pixel text-xs text-foreground font-bold flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-primary inline-block" />
                                PROFILE_OVERVIEW.DAT
                            </span>
                            <div className="flex gap-1.5 font-mono text-xs text-muted-foreground select-none">
                                <span>_</span>
                                <span>□</span>
                                <span>×</span>
                            </div>
                        </div>

                        <div className="p-6 space-y-5 text-left font-mono">
                            <h3 className="text-xl font-bold font-pixel text-foreground">
                                KAS // SOFTWARE ENGINEER
                            </h3>

                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                Hello! I'm Kas, a Software Engineering student passionate about building performant 
                                web applications, game systems, and exploring modern frameworks.
                            </p>

                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                I love translating complex problems into snappy, user-centric software. 
                                My technical interests span full-stack web platforms, machine learning pipelines, 
                                and game development with Unity and web canvas engines.
                            </p>

                            <div className="pt-4 border-t-2 border-border/60 flex flex-wrap gap-3">
                                <a 
                                    href="#contact" 
                                    className="pixel-btn pixel-btn-primary gap-1.5 text-xs"
                                >
                                    <Send size={14} />
                                    [CONTACT_ME]
                                </a>

                                <a 
                                    href="/resume.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="pixel-btn gap-1.5 text-xs"
                                >
                                    <FileText size={14} />
                                    [ACCESS_RESUME_PDF]
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 3 Retro Skill/Discipline Panels */}
                    <div className="space-y-4">
                        <div className="pixel-box p-5 text-left transition-transform hover:translate-x-1">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-primary/10 border-2 border-border text-primary shrink-0">
                                    <Code className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-pixel text-sm md:text-base font-bold text-foreground">
                                        FULL-STACK ARCHITECTURE
                                    </h4>
                                    <p className="font-mono text-xs md:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                                        Building scalable web applications and REST APIs using modern toolchains 
                                        like React, Node.js, FastAPI, and PostgreSQL.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pixel-box p-5 text-left transition-transform hover:translate-x-1">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-primary/10 border-2 border-border text-primary shrink-0">
                                    <Layout className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-pixel text-sm md:text-base font-bold text-foreground">
                                        INTERACTIVE UI & SYSTEMS
                                    </h4>
                                    <p className="font-mono text-xs md:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                                        Designing high-contrast, responsive interfaces with game-inspired feedback, 
                                        snappy animations, and accessible interactions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pixel-box p-5 text-left transition-transform hover:translate-x-1">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-primary/10 border-2 border-border text-primary shrink-0">
                                    <Cpu className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-pixel text-sm md:text-base font-bold text-foreground">
                                        AI & AUTOMATION PIPELINES
                                    </h4>
                                    <p className="font-mono text-xs md:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                                        Integrating LLMs, document analysis engines, and cloud databases (Supabase, Groq, HuggingFace) 
                                        into production workflows.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};