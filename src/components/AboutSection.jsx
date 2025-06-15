import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-24 relative">
            {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl md:text-4xl font-bold text-center">
                    About <span className="text-primary">Me</span>
                </h2>

                <div className="grid gird-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">
                            My First project
                        </h3>


                        <p className="text-lg md:text-xl text-muted-foreground mt-6">
                            Hello! I'm Kastron, a passionate web developer with a keen interest in creating
                            dynamic and responsive web applications. I love exploring new technologies and
                            pushing the boundaries of what's possible on the web.
                        </p>

                        <p className="flex flex-col sm:flex-row gap-4 pt-4 justify-center text-lg md:text-xl text-muted-foreground mt-4">
                            This portfolio is a showcase of my skills and projects. Feel free to explore and
                            connect with me if you have any questions or opportunities!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center mt-8">
                            <a href="#contact" className="cosmic-button bg-primary text-background hover:bg-primary/90 transition-colors duration-300 px-6 py-3 rounded-full shadow-lg">
                                {" "}
                                Contact Me
                            </a>

                            <a href="#contact" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
                                Download CV here
                            </a>
                        </div>
                    </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Code className="h-6 w-6 text-primary"/>
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Web development</h4>
                                <p className="text-muted-foreground mt-2">
                                    I specialize in building responsive and interactive web applications using modern
                                    technologies like React, Node.js, and more.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <User className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">UI/UX Design</h4>
                                    <p className="text-muted-foreground mt-2">
                                        I have a strong eye for design and user experience, ensuring that my applications are
                                        not only functional but also visually appealing and user-friendly.
                                    </p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Briefcase className="h-6 w-6 text-primary"/>
                                </div>
                                    <div className="text-left">
                                    <h4 className="font-semibold text-lg">Project Management
                                    </h4>
                                    <p className="text-muted-foreground mt-2">
                                        I have experience in managing projects from conception to deployment, ensuring that
                                        they are delivered on time and meet the client's requirements.
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </section>
    );
};