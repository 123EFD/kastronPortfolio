import { Mail, MapPin, Send, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DiscordIcon, XIcon, LinkedInIcon } from "./UI/customIcon";

export const ContactSection = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCopiedDiscord, setIsCopiedDiscord] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulated transmission with feedback
        setTimeout(() => {
            toast({
                title: "[TRANSMISSION_SUCCESSFUL]",
                description: `Thank you, ${formData.name}! Your message has been logged.`,
            });
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
        }, 1200);
    };

    return (
        <section id="contact" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="pixel-badge mb-3 text-primary">
                        [ COMMUNICATIONS_RELAY // FREQ: 2026 ]
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-pixel">
                        INITIALIZE <span className="text-primary">&lt;CONTACT&gt;</span>
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
                        Have an opportunity, collaboration idea, or question? Send a transmission or connect on socials.
                    </p>
                </div>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    
                    {/* Left Column: Terminal Diagnostics & Socials */}
                    <div className="pixel-box">
                        <div className="bg-secondary px-4 py-2 border-b-2 border-border flex items-center justify-between font-mono text-xs">
                            <span className="font-pixel text-primary font-bold">
                                COMM_DIAGNOSTICS.LOG
                            </span>
                            <span className="text-muted-foreground text-[10px]">[PORT_8080]</span>
                        </div>

                        <div className="p-6 space-y-6 text-left font-mono">
                            <div>
                                <h3 className="font-pixel text-base font-bold mb-2 text-foreground">
                                    DIRECT COMMUNICATIONS
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                    Always open to discussing full-stack software roles, open-source projects, 
                                    and innovative web/game ideas.
                                </p>
                            </div>

                            {/* Status & Location specs */}
                            <div className="space-y-3 pt-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <MapPin size={15} className="text-primary" />
                                    <span className="text-muted-foreground">LOCATION:</span>
                                    <span className="font-bold text-foreground">Malaysia (UTC+8)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Terminal size={15} className="text-primary" />
                                    <span className="text-muted-foreground">AVAILABILITY:</span>
                                    <span className="font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/30">
                                        OPEN_FOR_OPPORTUNITIES
                                    </span>
                                </div>
                            </div>

                            {/* Discord Quick Copy */}
                            <div className="p-3 bg-secondary border-2 border-border flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <DiscordIcon size={20} className="text-[#5865F2]" />
                                    <div>
                                        <div className="text-[10px] text-muted-foreground">DISCORD_ID</div>
                                        <div className="text-xs font-bold text-foreground">{discordUserId}</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleCopyDiscord}
                                    className="pixel-btn py-1 px-2 text-xs gap-1"
                                    title="Copy Discord Tag"
                                >
                                    {isCopiedDiscord ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                    <span>{isCopiedDiscord ? "COPIED" : "COPY"}</span>
                                </button>
                            </div>

                            {/* Social Grid */}
                            <div className="pt-2">
                                <div className="font-pixel text-xs text-muted-foreground mb-3 uppercase">
                                    // SOCIAL_CHANNELS
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    <a 
                                        href="https://www.linkedin.com/in/shier72/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="pixel-btn py-1.5 px-2.5 text-xs gap-1.5"
                                    >
                                        <LinkedInIcon size={14} />
                                        <span>LINKEDIN</span>
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

                    {/* Right Side: Retro Transmission Form with Name & Email */}
                    <div className="pixel-box">
                        <div className="bg-secondary px-4 py-2 border-b-2 border-border flex items-center justify-between font-mono text-xs">
                            <span className="font-pixel text-foreground font-bold">
                                SEND_TRANSMISSION.SH
                            </span>
                            <span className="text-primary text-[10px]">[ENCRYPTED]</span>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left font-mono">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold font-pixel text-foreground mb-1.5 uppercase">
                                    SENDER_NAME *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name / Call-sign"
                                    className="pixel-input text-xs md:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-bold font-pixel text-foreground mb-1.5 uppercase">
                                    RETURN_EMAIL *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="pixel-input text-xs md:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-bold font-pixel text-foreground mb-1.5 uppercase">
                                    PAYLOAD_MESSAGE *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message payload here..."
                                    className="pixel-input text-xs md:text-sm resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="pixel-btn pixel-btn-primary w-full py-2.5 gap-2 text-sm justify-center"
                            >
                                <Send size={15} />
                                <span>{isSubmitting ? "TRANSMITTING..." : "[TRANSMIT_MESSAGE]"}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
