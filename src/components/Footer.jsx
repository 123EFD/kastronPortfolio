import { ArrowUp } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="py-8 px-4 bg-background relative border-t-2 border-border mt-16 font-mono text-xs">
            <div className="container mx-auto max-w-5xl flex flex-wrap justify-between items-center gap-4">
                <div className="text-left space-y-1">
                    <p className="font-pixel text-primary text-xs">
                        &gt; KAS_DEV // PORTFOLIO_BUILD_2026
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                        &copy; {new Date().getFullYear()} KAS. ALL_SYSTEMS_OPERATIONAL.
                    </p>
                </div>
                
                <a 
                    href="#hero" 
                    className="pixel-btn py-1 px-3 text-xs gap-1.5"
                    aria-label="Back to top"
                >
                    <ArrowUp size={14} />
                    <span>[TOP]</span>
                </a>
            </div>
        </footer>
    );
};