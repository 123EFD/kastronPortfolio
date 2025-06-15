import { ArrowUp } from "lucide-react";
export const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center text-foreground ">
            {" "}
            <p className="text-sm text-muted-foreground">
                {" "}
                &copy; {new Date().getFullYear()} Kastron.co, All rights reserved.
            </p>
            
            <a href="#hero" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                <ArrowUp size={20} />
            </a>
        </footer>
    );
};