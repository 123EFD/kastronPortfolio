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

            <div className="grid grid-cols-1 md:grid-cols-2 sm:flex-row justify-center items-center gap-12">
                <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-6"> Contact Information</h3>

                    <div className="space-y-6 justify-center">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                            <Mail className="h-6 w-6 text-primary" />{" "}
                            </div>
                            <div>
                                <h4 className="font-medium"> Email</h4>
                                <a
                                href="mailto:zhandouzhishengji@gmail.com"
                                className="text-muted-foreground hover:text-indigo-300 transition-colors"
                                >
                                    zhandouzhishengji@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                            <Phone className="h-6 w-6 text-primary" />{" "}
                            </div>
                            <div>
                                <h4 className="font-medium"> Phone</h4>
                                <a
                                href="tel:+60123456789"
                                className="text-muted-foreground hover:text-indigo-300 transition-colors"
                                >
                                    +60 (123) 456-7890
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                            <MapPin className="h-6 w-6 text-primary" />{" "}
                            </div>
                            <div>
                                <h4 className="font-medium"> Location</h4>
                                <a
                                href="https://www.google.com/maps/place/Kuala+Lumpur,+Malaysia"
                                target="_blank"
                                className="text-muted-foreground hover:text-indigo-300 transition-colors"
                                >
                                    Kuala Lumpur, Malaysia
                                </a>
                            </div>
                        </div>
                    </div>

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
                                <Twitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

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