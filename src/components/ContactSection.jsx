import { MapPin, Copy, Check, Terminal, ExternalLink, Briefcase, Calendar, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DiscordIcon, XIcon, LinkedInIcon } from "./UI/customIcon";

export const ContactSection = () => {
    const { toast } = useToast();
    const [isCopiedDiscord, setIsCopiedDiscord] = useState(false);

    const discordUserId = "kas0056";

    const handleCopyDiscord = () => {
        navigator.clipboard.writeText(discordUserId);
        setIsCopiedDiscord(true);
        setTimeout(() => setIsCopiedDiscord(false), 2000);
        toast({
            title: "[DISCORD_ID_COPIED]",
            description: `Handle '${discordUserId}' copied to clipboard.`,
        });
    };

    return (
        <section id="contact" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="pixel-badge mb-3 text-primary">
                        [ COMMUNICATIONS &amp; STATUS // FREQ: 2026 ]
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-pixel">
                        STATUS &amp; <span className="text-primary">&lt;CONNECT&gt;</span>
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
                        Current career objectives, active availability, and verified communication channels.
                    </p>
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Left Column: Direct Communication Channels */}
                    <div className="pixel-box flex flex-col justify-between">
                        <div>
                            <div className="bg-secondary px-4 py-2 border-b-2 border-border flex items-center justify-between font-mono text-xs">
                                <span className="font-pixel text-primary font-bold">
                                    COMM_CHANNELS.LOG
                                </span>
                                <span className="text-muted-foreground text-[10px]">[PORT_8080]</span>
                            </div>

                            <div className="p-6 space-y-6 text-left font-mono">
                                <div>
                                    <h3 className="font-pixel text-base font-bold mb-2 text-foreground">
                                        VERIFIED CONTACT POINTS
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                        To prevent spam, form transmissions are disabled. 
                                        Please reach out directly through LinkedIn messaging or Discord for the fastest response!
                                    </p>
                                </div>

                                {/* Location & Meta */}
                                <div className="space-y-3 pt-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={15} className="text-primary" />
                                        <span className="text-muted-foreground">LOCATION:</span>
                                        <span className="font-bold text-foreground">Malaysia (UTC+8)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Terminal size={15} className="text-primary" />
                                        <span className="text-muted-foreground">WORK_PREFERENCE:</span>
                                        <span className="font-bold text-foreground">Remote / Hybrid</span>
                                    </div>
                                </div>

                                {/* Discord Quick Copy */}
                                <div className="p-3 bg-secondary border-2 border-border flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <DiscordIcon size={20} className="text-[#5865F2]" />
                                        <div>
                                            <div className="text-[10px] text-muted-foreground">DISCORD_TAG</div>
                                            <div className="text-xs font-bold text-foreground font-mono">{discordUserId}</div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleCopyDiscord}
                                        className="pixel-btn py-1 px-2.5 text-xs gap-1"
                                        title="Copy Discord Tag"
                                    >
                                        {isCopiedDiscord ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                        <span>{isCopiedDiscord ? "COPIED" : "COPY"}</span>
                                    </button>
                                </div>

                                {/* Social Links Grid */}
                                <div className="pt-2">
                                    <div className="font-pixel text-xs text-muted-foreground mb-3 uppercase">
                                        // OFFICIAL_CHANNELS
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        <a 
                                            href="https://www.linkedin.com/in/shier72/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pixel-btn pixel-btn-primary py-1.5 px-3 text-xs gap-1.5"
                                        >
                                            <LinkedInIcon size={14} />
                                            <span>LINKEDIN</span>
                                            <ExternalLink size={12} />
                                        </a>
                                        <a 
                                            href="https://github.com/123EFD" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pixel-btn py-1.5 px-2.5 text-xs gap-1.5"
                                        >
                                            <span>GITHUB</span>
                                            <ExternalLink size={12} />
                                        </a>
                                        <a 
                                            href="https://twitter.com/123EFD" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pixel-btn py-1.5 px-2.5 text-xs gap-1.5"
                                        >
                                            <XIcon size={14} />
                                            <span>X/TWITTER</span>
                                        </a>
                                        <a 
                                            href="https://youtube.com/@kas-h9l?si=JLL32qSXjyJZ_yuD" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pixel-btn py-1.5 px-2.5 text-xs gap-1.5"
                                        >
                                            <span>YOUTUBE</span>
                                        </a>
                                        <a 
                                            href="https://www.instagram.com/chinshier" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pixel-btn py-1.5 px-2.5 text-xs gap-1.5"
                                        >
                                            <span>INSTAGRAM</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 8-Bit Career Status Board */}
                    <div className="pixel-box flex flex-col justify-between">
                        <div>
                            <div className="bg-secondary px-4 py-2 border-b-2 border-border flex items-center justify-between font-mono text-xs">
                                <span className="font-pixel text-primary font-bold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                                    AVAILABILITY_STATUS.DAT
                                </span>
                                <span className="font-pixel text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/30">
                                    ACTIVE_SEEKING
                                </span>
                            </div>

                            <div className="p-6 space-y-5 text-left font-mono">
                                <div>
                                    <h3 className="font-pixel text-base font-bold text-foreground flex items-center gap-2">
                                        <Briefcase size={16} className="text-primary" />
                                        CURRENT OBJECTIVES &amp; ROLES
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Actively open to the following positions:
                                    </p>
                                </div>

                                {/* Status Card 1: Remote Annotator */}
                                <div className="p-4 bg-secondary/50 border-2 border-border space-y-2 relative overflow-hidden group">
                                    <div className="flex items-center justify-between">
                                        <span className="font-pixel text-xs text-primary font-bold">
                                            [ROLE_01 // REMOTE_AI]
                                        </span>
                                        <span className="text-[10px] font-pixel px-1.5 py-0.5 bg-primary/10 border border-primary text-primary">
                                            PART-TIME
                                        </span>
                                    </div>
                                    <h4 className="font-pixel text-sm font-bold text-foreground">
                                        Remote AI Data Annotator
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        AI data annotation, prompt evaluation, model output quality verification, data labeling, and ground-truth validation.
                                    </p>
                                    <div className="flex items-center gap-3 pt-1 text-[11px] text-foreground font-semibold">
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} className="text-primary" />
                                            Flexible Hours
                                        </span>
                                        <span>•</span>
                                        <span>100% Remote</span>
                                    </div>
                                </div>

                                {/* Status Card 2: Voluntary Internship */}
                                <div className="p-4 bg-secondary/50 border-2 border-border space-y-2 relative overflow-hidden group">
                                    <div className="flex items-center justify-between">
                                        <span className="font-pixel text-xs text-accent font-bold">
                                            [ROLE_02 // INTERNSHIP]
                                        </span>
                                        <span className="text-[10px] font-pixel px-1.5 py-0.5 bg-accent/10 border border-accent text-accent">
                                            VOLUNTARY
                                        </span>
                                    </div>
                                    <h4 className="font-pixel text-sm font-bold text-foreground">
                                        Software Engineering Internship
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Full-Stack web development, API engineering, interactive UI systems, and backend automation pipelines.
                                    </p>
                                    <div className="flex items-center gap-3 pt-1 text-[11px] text-foreground font-semibold">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} className="text-accent" />
                                            July Intake
                                        </span>
                                        <span>•</span>
                                        <span className="text-primary">3 Months Duration</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Direct Action Trigger */}
                        <div className="p-6 pt-0">
                            <a 
                                href="https://www.linkedin.com/in/shier72/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pixel-btn pixel-btn-primary w-full py-2.5 gap-2 text-sm justify-center"
                            >
                                <LinkedInIcon size={16} />
                                <span>[CONNECT_ON_LINKEDIN]</span>
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
