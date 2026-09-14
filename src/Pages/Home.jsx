import { PixelBackground } from '@/components/PixelBackground';
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative selection:bg-primary selection:text-primary-foreground">
            {/* 8-bit Gaming/Hacker Background Effect */}
            <PixelBackground />

            {/* Main Sections */}
            <main className="relative z-10">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};
