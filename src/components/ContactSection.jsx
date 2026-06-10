import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";


export const ContactSection = () => {
        const {toast} = useToast();
        const [isSubmitting, setIsSubmitting] = useState(false);

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
        <section className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Get In <span className="text-primary"> Touch</span>
            </h2>

            <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                If you have any questions, feedback, or just want to say hello, feel free to reach out! I'm always open to new opportunities and collaborations.
            </p>


            <div className="bg-card p-8 rounded-lg shadow-xs"
                onSubmit={handleSubmit}          
                >
                <h3 className="text-2xl font-semibold mb-6">Send a message</h3>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2"
                        >
                            {" "}
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary transition-colors"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2"
                        >
                            {" "}
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary transition-colors"
                            placeholder="...@gmail.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2"
                        >
                            {" "}
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
        </div>
    </section>
    );
};
