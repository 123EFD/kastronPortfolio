import { ExternalLink, Github, Tags, ArrowRight } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Flappytron",
        description: "An improvement of the classic Flappy Bird game, built with Unity. Features include responsive design, sound effects, a scoring system and more challenging gameplay.",
        image: "/projects/project1.png",
        tags: ["Unity", "C#", "Game Development"],
        demoUrl: "https://khytron.itch.io/kastron",
        githubUrl: "https://github.com/Khytron/Flappytron.git",
    },

    {
        id: 2,
        title: "Financial Dashboard",
        description: "A comprehensive financial dashboard that provides insights into personal finances, including income, expenses, and savings. Built with Streamlit and Plotly for data visualization.",
        image: "/projects/project2.png",
        tags: ["Streamlit", "Python", "Data Visualization"],
        demoUrl: "https://kas-financialdashboard.streamlit.app/",
        githubUrl: "https://github.com/123EFD/FINANCEAPP.git",
    },

    {
        id: 3,
        title: "Converso",
        description: "Converso is an AI-powered learning assistant that allows users to create personalized AI companions for focused, subject-specific discussions. ",
        image: "/projects/project3.png",
        tags: ["Next.js", "React", "Clerk","Supabase","Vapi","Shadcn/ui"],
        demoUrl: "https://saas-app-nine-orpin.vercel.app/",
        githubUrl: "https://github.com/123EFD/saas-app.git",
    },

]

export const ProjectsSection = () => {
    return (

    <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {" "}
                Featured <span className="text-primary"> Projects </span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and creativity. Click on the project titles to view more details or visit the demo.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:gird-cols-3 gap-8">
                    {projects.map((project, key) => (
                        <div key={key} className="group bg-card rounded-lg overload-hidden shadow-xs card-hover"
                        >
                            <div className="h-48 overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wra gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                                            <Tags className="mr-1 h-4 w-4" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 text-blue-500">
                                {project.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-3">
                                    <a href={project.demoUrl}
                                    target="_blank" rel="noopener noreferrer"
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300 ">
                                        <ExternalLink size={20}/>
                                    </a>
                                    <a href={project.githubUrl}
                                    target="_blank" rel="noopener noreferrer"
                                    className="text-foreground/80 hover:text-primary transition-colors duration-300 "
                                    >
                                        <Github size={20}/>
                                    </a>
                                </div>
                            </div>
                          </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a className="cosmic-button w-fit flex items-center mx-auto gap-2 bg-primary text-background hover:bg-primary/90 transition-colors duration-300 px-6 py-3 rounded-full shadow-lg" 
                        target="_blank" rel="noopener noreferrer"
                        href="https://github.com/123EFD">
                        Check out My Github <ArrowRight size={16} className="inline h-4 w-4 ml-1" />
                        <span className="text-blue-300"></span>   
                    </a>
                </div>

            </div>
    </section>
);
};