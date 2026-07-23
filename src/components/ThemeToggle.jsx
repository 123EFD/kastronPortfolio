import { Moon, Store, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
export const ThemeToggle = () => {
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
            className={cn(
                "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
                "focus:outline-hidden"
        )}>
            {
                isDarkMode?(
                    <Sun className = 'h-6 w-6 text-yellow-300' />
                ) : (
                    <Moon  className = 'h-6 w-6 text-blue-900'/>
            )}
        </button >
    );
};