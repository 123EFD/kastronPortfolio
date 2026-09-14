import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { 
        name: "Food Blog", 
        href: "https://food-challenge-jet.vercel.app",
        target: "_blank",
        rel: "noopener noreferrer"
    },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-200 border-b-2 border-border bg-background/90 backdrop-blur-md",
                isScrolled ? "py-2.5 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_0_0_rgba(0,0,0,0.5)]" : "py-3.5"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Retro Brand / Logo */}
                <a 
                    className="font-pixel text-lg md:text-xl font-bold flex items-center gap-2 text-foreground group"
                    href="/#hero"
                >
                    <span className="text-primary group-hover:text-accent transition-colors">&gt;</span>
                    <span>
                        <span className="text-primary font-bold">KAS</span>_DEV
                    </span>
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />
                </a>

                {/* Desktop Nav */}
                <div className="flex max-md:hidden space-x-6 items-center">
                    {navItems.map((item, key) => (
                        item.isRoute ? (
                            <Link
                                key={key}
                                to={item.href}
                                className="font-mono text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors duration-150 font-semibold uppercase hover:translate-y-[-1px]"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <a 
                                key={key} 
                                href={item.href} 
                                target={item.target}
                                rel={item.rel}
                                className="font-mono text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors duration-150 font-semibold uppercase hover:translate-y-[-1px]"
                            >
                                {item.name}
                            </a>
                        )
                    ))}

                    {/* Integrated Theme Toggle (Desktop) */}
                    <div className="pl-2 border-l-2 border-border">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Nav Top Bar Controls (Theme Toggle + Hamburger) */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />

                    <button 
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="pixel-btn p-1.5 text-foreground z-[110]"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                <div className={cn(
                    "fixed inset-0 bg-background/98 z-[100] flex flex-col items-center justify-center border-b-4 border-border",
                    "transition-all duration-200 md:hidden",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>
                    {/* Header badge inside mobile drawer */}
                    <div className="pixel-badge mb-8 text-primary">
                        [ MENU_SYSTEM_v1.0 ]
                    </div>

                    <div className="flex flex-col space-y-6 text-center items-center">
                        {navItems.map((item, key) => (
                            item.isRoute ? (
                                <Link
                                    key={key}
                                    to={item.href}
                                    className="font-pixel text-xl uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    &gt; {item.name}
                                </Link>
                            ) : (
                                <a
                                    key={key}
                                    href={item.href}
                                    target={item.target}
                                    rel={item.rel}
                                    className="font-pixel text-xl uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    &gt; {item.name}
                                </a>
                            )
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t-2 border-border w-48 flex justify-center">
                        <ThemeToggle showLabel={true} />
                    </div>
                </div>
            </div>
        </nav>
    );
};
