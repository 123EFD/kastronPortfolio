import { ArrowDown, Terminal, Sparkles, Send } from "lucide-react";

export const HeroSection = () => {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
            <div className="container max-w-4xl mx-auto text-center z-10">
                <div className="space-y-6">
                    {/* Retro Status Terminal Badge */}
                    <div className="inline-flex items-center gap-2 pixel-badge text-xs md:text-sm text-foreground bg-secondary/80 mb-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="font-pixel text-primary">[SYS_STATUS: ONLINE]</span>
                        <span className="text-muted-foreground">//</span>
                        <span>OPEN_FOR_OPPORTUNITIES</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground font-pixel">
                        <span>HELLO WORLD, I'M </span>
                        <span className="text-primary underline decoration-4 decoration-primary/40">KAS</span>
                    </h1>

                    {/* Subtitle / Role */}
                    <div className="font-mono text-sm sm:text-base md:text-lg text-primary font-semibold tracking-wider">
                        &gt; SOFTWARE_ENGINEER // FULL_STACK_BUILDER
                    </div>

                    {/* Value Proposition Description */}
                    <p className="font-mono text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        I engineer robust web applications, interactive digital experiences, and intelligent AI tools. 
                        Passionate about clean architecture, snappy interfaces, and game-inspired UI engineering.
                    </p>

                    {/* Tech Stack Mini Inventory */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2 pb-4">
                        {['REACT', 'TYPESCRIPT', 'PYTHON', 'FASTAPI', 'TAILWIND', 'SUPABASE'].map((tech) => (
                            <span key={tech} className="font-mono text-xs px-2.5 py-1 bg-secondary border border-border text-foreground font-medium">
                                #{tech}
                            </span>
                        ))}
                    </div>

                    {/* Retro 8-bit Action CTAs */}
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <a 
                            href="#projects" 
                            className="pixel-btn pixel-btn-primary gap-2"
                        >
                            <Terminal size={16} />
                            [VIEW_PROJECTS]
                        </a>
                        <a 
                            href="#contact" 
                            className="pixel-btn gap-2"
                        >
                            <Send size={16} />
                            [INITIALIZE_CONTACT]
                        </a>
                    </div>
                </div>
            </div>

            {/* Retro Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="font-pixel text-xs text-muted-foreground uppercase tracking-widest mb-2 animate-pulse-subtle">
                    [PRESS_START // SCROLL]
                </span>
                <ArrowDown className="h-4 w-4 text-primary animate-bounce" />
            </div>
        </section>
    );
};
