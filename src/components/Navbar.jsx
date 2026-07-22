import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Blog", href: "/blog", isRoute: true },
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
            className={cn("fixed top-0 left-0 w-full z-50 transition-all duration-300",
                isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
            )}
        >

            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

                <a className="text-xl font-bold text-primary flex items-center relative z-50"
                    href="/#hero"
                >
                    <span>
                        <span className="text-glow text-foreground"> Kas </span>{" "}
                        Portfolio
                    </span>
                </a>

                {/* desktop nav */}
                <div className="flex max-md:hidden space-x-8 items-center">
                    {navItems.map((item, key) => (
                        item.isRoute ? (
                            <Link
                                key={key}
                                to={item.href}
                                className="text-foreground opcaity-80 hover:text-primary hover:opacity-100 transition-all duration-300 font-medium"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <a key={key} href={item.href} className="text-foreground opcaity-80 hover:opacity-100 transition-all duration-300 font-medium">
                                {item.name}
                            </a>
                        )

                    ))}
                </div>

                {/* mobile nav */}
                <button onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground z-[110] hover:text-primary transition-colors duration-300"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}

                </button>

                <div className={cn(
                    "fixed inset-0 bg-background/95 backdrop-blur z-40 flex flex-col items-center justify-center",
                    "transition-all duration-300 md:hidden",
                    isMenuOpen ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
                >
                    <div className="flex flex-col space-y-8 text-xl items-center">
                        {navItems.map((item, key) => (
                            item.isRoute ? (
                                <Link
                                    key={key}
                                    to={item.href}
                                    className="text-foreground opacity-80 hover:text-primary transition-colors duration-300 font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <a
                                    key={key}
                                    href={item.href}
                                    className="text-foreground opacity-80 hover:text-primary hover:opacity-100 transition-all duration-300 font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            )

                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

