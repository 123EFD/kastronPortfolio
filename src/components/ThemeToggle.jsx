import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const ThemeToggle = ({ className, showLabel = false }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
                "pixel-btn py-1 px-2.5 text-xs font-pixel flex items-center gap-1.5 transition-colors",
                isDarkMode 
                    ? "bg-secondary text-primary border-border hover:text-white" 
                    : "bg-secondary text-foreground border-border hover:bg-muted",
                className
            )}
        >
            {isDarkMode ? (
                <>
                    <Sun className="h-3.5 w-3.5 text-primary animate-pulse-subtle" />
                    {showLabel && <span>[LIGHT_MODE]</span>}
                </>
            ) : (
                <>
                    <Moon className="h-3.5 w-3.5 text-foreground" />
                    {showLabel && <span>[DARK_MODE]</span>}
                </>
            )}
        </button>
    );
};