import { Mail, Phone, MapPin, Instagram, Youtube, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DiscordIcon, XIcon, LinkedInIcon } from "./UI/customIcon";

export const ContactSection = () => {
        const {toast} = useToast();
        const [isSubmitting, setIsSubmitting] = useState(false);
        const discordUserId = "kas0056";

        //discord copy userID function
        const handleCopyDiscord = () => {
        navigator.clipboard.writeText(discordUserId);
        
        // Show the success toast
        toast({
            title: "ID Copied!",
            description: "Discord User ID has been copied to your clipboard.",
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            setIsSubmitting(true);

            setTimeout(() => {
                toast({
                    title: "Message Sent",
                    description: "Thank you for reaching out! I'll get back to you soon.",
                });
                setIsSubmitting(false);
            }, 1500);
        };

        return (
            <section id="contact" className="py-24 px-4 relative bg-secondary/30">
                <div className="container mx-auto max-w-5xl ">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                        Get In <span className="text-primary"> Touch</span>
                    </h2>

                    <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        If you have any questions, feedback about my projects and this website, feel free to comment out! 
                    </p>

                    {/* Main grid container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:flex-row justify-center items-center gap-12">
                        
                        {/* Left side: Contact information */}
                        <div className="space-y-8 text-left">
                            

                            <div className="pt-8">
                                <h4 className="font-medium mb-4">Connect with me</h4>
                                <div className="flex space-x-4 justify-center">
                                    <a href="https://youtube.com/@kas-h9l?si=JLL32qSXjyJZ_yuD" target="_blank" rel="noopener noreferrer">
                                        <Youtube />
                                    </a>
                                    <a href="https://www.instagram.com/chinshier?igsh=MTYxNzFxemo0azdnYQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                                        <Instagram />
                                    </a>
                                    <a href="https://twitter.com/123EFD" target="_blank" rel="noopener noreferrer">
                                        <XIcon />
                                    </a>
                                    <a target="_blank" className="text-muted-foreground hover:text-[#5865F2] transition-colors" rel="noopener noreferrer" onClick={handleCopyDiscord}>
                                        <div className="sr-only">kas0056</div>
                                        <DiscordIcon size={24} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/shier72/" target="_blank" rel="noopener noreferrer">
                                        <LinkedInIcon size={24} />
                                    </a>

                                </div>
                            </div>
                        </div>
                    
                        {/* Right Side: Contact Form (Now inside the grid) */}
                        <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
                            <h3 className="text-2xl font-semibold mb-6 text-left">Send a message</h3>

                            <form onSubmit={handleSubmit}  className="space-y-6 text-left">

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2"
                                    >
                                        Your message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary transition-colors resize-none"
                                        placeholder="Leave your message here"
                                    />
                                </div>

                                <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "cosmic-button w-full flex items-center justify-center gap-2",
                                )}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    <span className="text-blue-300  text-center"></span>
                                    <Send size={16} className="inline h-4 w-4 ml-1" />
                                </button>
                            </form>
                        </div>
                    </div> {/* End of grid container */}
                </div>
        </section>
        );
};
