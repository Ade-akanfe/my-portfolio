"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useState } from "react";
import { FiArrowUpRight, FiGithub, FiExternalLink, FiX, FiCheckCircle } from "react-icons/fi";

interface Project {
    title: string;
    category: string;
    description: string;
    tech: string[];
    image: string;
    link: string;
    github?: string;
    color: string;
    details: string[];
    status?: string; // e.g. "Work in Progress" or "Active"
}

const PROJECTS: Project[] = [
    {
        title: "Unified Healthcare Ecosystem",
        category: "Full-Stack • SWITexas",
        description: "Developed a mission-critical healthcare platform that consolidated five booking and payment tools. Improved operational efficiency by 40% and reduced patient booking time by 60%.",
        tech: ["Next.js", "Supabase", "Stripe", "Docker", "Framer Motion"],
        image: "/images/switexas.png",
        link: "http://switexas.com/",
        color: "#0b6b3a",
        details: [
            "Built a unified healthcare web app with Next.js and Supabase, consolidating five booking and payment tools into one platform, improving operational efficiency by ~40% and reducing patient booking time by 60%.",
            "Integrated Stripe for in-app payments and designed a responsive UI with Tailwind, Shadcn, and Framer Motion, increasing appointment completion rate by 45% and accessibility scores from 68 to 95.",
            "Implemented CI/CD pipelines with Docker and GitHub Actions and optimized backend logic, cutting deployment time from 1 hour to 10 minutes, ensuring 99.9% uptime, and improving load speed by 35%."
        ]
    },
    {
        title: "Suits.com.ng Storefront",
        category: "Full-Stack • Suits.com.ng",
        description: "Rebuilt a legacy PHP site into a modern Next.js/Node.js application. Boosted organic visibility by 25% and performance from 30% to 90%.",
        tech: ["Next.js", "Node.js", "Paystack", "Docker", "Shadcn"],
        image: "/images/suits.png",
        link: "https://suits.com.ng/",
        color: "#fbbf24",
        details: [
            "Rebuilt Suits.com.ng from a legacy PHP site into a modern full-stack Next.js and Node.js application, improving site performance from 30% to 90% (Google Lighthouse) and boosting organic visibility by 25%.",
            "Redesigned the user interface with Tailwind CSS, Shadcn, and Framer Motion, increasing dwell time by 40%, cart retention by 30%, and driving a 20% rise in monthly revenue after relaunch.",
            "Integrated Paystack for secure checkout and deployed CI/CD pipelines with Docker and GitHub Actions, reducing release time by 70%, maintaining 99.9% uptime, and processing millions of naira in transactions."
        ]
    },
    {
        title: "Car Valuation API",
        category: "Backend Engine • Nest.js",
        description: "A robust backend system built with Nest.js that suggests market-accurate car prices based on multi-parameter properties (make, model, year, and condition).",
        tech: ["Nest.js", "TypeORM", "PostgreSQL", "TypeScript", "Swagger"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        link: "#",
        github: "https://github.com/Ade-akanfe/car_app",
        color: "#1d4ed8",
        details: [
            "Architected a scalable RESTful API with Nest.js, implementing a modular dependency injection pattern that ensures clean, maintainable, and testable code.",
            "Developed a predictive algorithm to suggest accurate car market prices by analyzing property-based datasets through performant database queries.",
            "Integrated TypeORM for secure PostgreSQL management and Swagger for comprehensive API documentation, enabling seamless frontend integration.",
            "Built with strict TypeScript enforcement to ensure high reliability and zero-error runtime performance across complex valuation logic."
        ]
    },
    {
        title: "Caring2Share Foundation",
        category: "Landing Page • Foundation",
        description: "A digital hub for a global non-profit dedicated to education and healthcare. Integrated secure PayPal donation systems to support world-wide empowerment programs.",
        tech: ["Next.js", "PayPal SDK", "Tailwind CSS", "GSAP", "Framer Motion"],
        image: "/images/caring.png",
        link: "https://www.caring2share.org/",
        color: "#fb7185",
        details: [
            "Designed and deployed a high-impact landing page for a global non-profit foundation, achieving a lighthouse performance score of 98 and improving site engagement by 35%.",
            "Integrated secure PayPal SDK for international donation processing, ensuring a frictionless contribution flow to support education, healthcare, and community empowerment initiatives.",
            "Architected a mobile-first, responsive design that ensures accessibility for users in varying bandwidth regions, increasing unique visits from mobile devices by 50%."
        ]
    }
];

const ARCHIVE_PROJECTS: Project[] = [
    {
        title: "Acryl Dashboard",
        category: "Frontend • Architecture",
        description: "A modern React-based dashboard architecture using TanStack Query for state management and high-performance data fetching.",
        tech: ["Next.js", "@tanstack/react-query", "TypeScript", "Tailwind"],
        image: "/images/acryl.png",
        link: "#",
        status: "Active Project",
        color: "#06b6d4",
        details: [
            "Implemented enterprise-level state management with @tanstack/react-query, optimizing API interactions and caching.",
            "Developed complex UI components with shadcn/ui and custom Tailwind configurations for brand consistency.",
            "Ensured type safety across the entire data layer using TypeScript, reducing production bugs by significantly."
        ]
    },
    {
        title: "Letherbloom Training",
        category: "Health • Zoom Integration",
        description: "A niche fitness platform for women's upper body training. Bridges the gap between trainers and students via in-app Zoom sessions.",
        tech: ["Next.js", "Zoom SDK", "Socket.io", "Framer Motion"],
        image: "/images/letherbloom.png",
        link: "#",
        status: "Work in Progress",
        color: "#8b5cf6",
        details: [
            "Integrated Zoom Video SDK to provide high-quality, in-app coaching sessions without external redirects.",
            "Built a custom scheduling system and dashboard for trainers to manage students and training progress.",
            "Designed a specialized UI focused on accessibility and ease of use for health-focused communities."
        ]
    }
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [showArchive, setShowArchive] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const projectCards = gsap.utils.toArray(".main-project-card");
        const labCards = gsap.utils.toArray(".lab-project-card");

        // Main Projects Slide-in
        gsap.fromTo(projectCards,
            { y: 100, x: (i) => i % 2 === 0 ? -40 : 40, opacity: 0 },
            {
                y: 0,
                x: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 80%",
                }
            }
        );

        // Lab Section Slide-in
        gsap.fromTo(labCards,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".lab-grid",
                    start: "top 85%",
                }
            }
        );

        gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                }
            }
        );

    }, []);

    // Handle modal animations when activeProject changes
    useEffect(() => {
        if (activeProject) {
            // Animate In
            const overlay = document.querySelector(".modal-overlay");
            const content = document.querySelector(".modal-content");
            if (overlay && content) {
                gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
                gsap.fromTo(content, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power3.out" });
            }
        }
    }, [activeProject]);

    const openModal = (project: Project) => {
        setActiveProject(project);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        const overlay = document.querySelector(".modal-overlay");
        const content = document.querySelector(".modal-content");
        
        if (overlay && content) {
            gsap.to(content, { y: 50, opacity: 0, duration: 0.3, ease: "power3.in" });
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    setActiveProject(null);
                    document.body.style.overflow = "";
                }
            });
        } else {
            setActiveProject(null);
            document.body.style.overflow = "";
        }
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative w-full py-18 md:py-20 bg-[#fcf8ef] overflow-hidden"
        >
            {/* Background Texture/Blobs */}
            <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-green-50/40 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-orange-50/30 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

                {/* Header */}
                <div ref={titleRef} className="max-w-3xl mb-20 md:mb-32 space-y-6">
                    <p className="text-xs uppercase tracking-[0.3em] font-black text-[#0b6b3a]">Case Studies</p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-800 tracking-tight leading-[1.05]">
                        Selected work that<br />
                        <span className="italic text-[#0b6b3a]">defines standard</span>
                    </h2>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-32">
                    {PROJECTS.map((project, i) => (
                        <div
                            key={i}
                            onClick={() => openModal(project)}
                            className="main-project-card group relative flex flex-col space-y-8 cursor-pointer"
                        >
                            {/* Image Container - Top (Padded Box Style) */}
                            <div className="rounded-[40px] bg-white shadow-xl shadow-gray-200/50 shrink-0 p-4 md:p-6 group-hover:shadow-2xl transition-shadow duration-500">
                                <div className="relative w-full aspect-16/10 overflow-hidden rounded-[24px]">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        priority={i < 2}
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                                        <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-bold transform translate-y-10 group-hover:translate-y-0 transition-all duration-500 hover:scale-105">
                                            View Case Study
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info - Bottom */}
                            <div className="space-y-6 px-6 text-left">
                                <div className="space-y-3">
                                    <p className="text-[10px] md:text-xs font-black text-[#0b6b3a] uppercase tracking-widest">{project.category}</p>
                                    <h3 className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight leading-tight">{project.title}</h3>
                                </div>
                                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tech Pills */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.tech.slice(0, 4).map(t => (
                                        <span key={t} className="text-[9px] md:text-[10px] font-bold text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lab & Experiments Section - Always Visible */}
                <div className="mt-40 md:mt-16 space-y-20">
                    <div className="max-w-3xl space-y-4">
                        <p className="text-xs uppercase tracking-[0.3em] font-black text-[#8b5cf6]">Lab & Experiments</p>
                        <h3 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">Technical deep-dives.</h3>
                        <p className="text-gray-400 text-base max-w-lg">A collection of technical experiments, active developments, and behind-the-scenes engineering work.</p>
                    </div>

                    <div className="lab-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {ARCHIVE_PROJECTS.map((project, i) => (
                            <div
                                key={i}
                                onClick={() => openModal(project)}
                                className="lab-project-card group relative flex flex-col space-y-8 cursor-pointer"
                            >
                                <div className="rounded-[30px] bg-white shadow-lg p-4 md:p-5 group-hover:shadow-xl transition-all duration-500">
                                    <div className="relative w-full aspect-16/10 overflow-hidden rounded-[20px]">
                                        <Image 
                                            src={project.image} 
                                            alt={project.title} 
                                            fill 
                                            className="object-cover object-top" 
                                        />
                                        
                                        {/* Active Status Badge */}
                                        {project.status && (
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[10px] font-black px-4 py-2 rounded-full text-gray-900 shadow-xl border border-gray-100 uppercase tracking-widest flex items-center gap-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.status === "Work in Progress" ? "bg-orange-500" : "bg-[#0b6b3a]"}`} />
                                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${project.status === "Work in Progress" ? "bg-orange-500" : "bg-[#0b6b3a]"}`} />
                                                </span>
                                                {project.status}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4 px-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{project.category}</p>
                                        <h4 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">{project.title}</h4>
                                    </div>
                                    <p className="text-gray-500 text-sm md:text-lg leading-relaxed">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-[8px] md:text-[9px] font-bold text-gray-300 border border-gray-100/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Archive Note */}
                <div className="mt-20  text-center">
                    <p className="text-xs uppercase tracking-[0.3em] font-black text-gray-300">
                        End of showcase — thank you for exploring.
                    </p>
                </div>
            </div>

            {/* ─── PROJECT MODAL ─────────────────────────────── */}
            {activeProject && (
                <div className="modal-overlay fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10 lg:p-16 bg-black/60 backdrop-blur-md overflow-hidden">
                    <div className="absolute inset-0 cursor-pointer" onClick={closeModal} />

                    <div className="modal-content relative w-full max-w-4xl max-h-[95vh] bg-[#fcf8ef] rounded-[40px] shadow-3xl overflow-y-auto no-scrollbar flex flex-col items-center">
                        {/* Close button inside */}
                        <button
                            onClick={closeModal}
                            className="fixed top-8 right-8 md:top-12 md:right-12 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:scale-110 active:scale-90 transition-all z-50 border border-white/50"
                        >
                            <FiX className="w-6 h-6" />
                        </button>

                        {/* Modal Container with generous Padding */}
                        <div className="w-full p-6 md:p-14 lg:p-20 space-y-12 md:space-y-20">

                            {/* Image on Top (Stacked Padded Container) */}
                            <div className="w-full rounded-[40px] bg-white shadow-2xl p-6 md:p-10 flex items-center justify-center">
                                <div className="relative w-full aspect-16/10">
                                    <Image
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        fill
                                        className={activeProject.status ? "object-cover object-top rounded-xl" : "object-contain"}
                                    />
                                </div>
                            </div>

                            {/* Content Below */}
                            <div className="space-y-12 md:space-y-16">
                                <div className="space-y-6">
                                    {activeProject.status && (
                                        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                                            <span className="relative flex h-2 w-2">
                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeProject.status === "Work in Progress" ? "bg-orange-500" : "bg-[#0b6b3a]"}`} />
                                                <span className={`relative inline-flex rounded-full h-2 w-2 ${activeProject.status === "Work in Progress" ? "bg-orange-500" : "bg-[#0b6b3a]"}`} />
                                            </span>
                                            {activeProject.status}
                                        </div>
                                    )}
                                    <p className="text-xs md:text-sm font-black text-[#0b6b3a] uppercase tracking-[0.4em]">{activeProject.category}</p>
                                    <h3 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">{activeProject.title}</h3>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {activeProject.tech.map(t => (
                                            <span key={t} className="text-[10px] md:text-xs font-bold text-gray-500 bg-gray-100 border border-gray-200 px-4 py-2 rounded-full uppercase tracking-wider">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <h4 className="text-xl md:text-2xl font-black text-gray-900 border-l-4 border-[#0b6b3a] pl-6 py-1">Case Study Details</h4>
                                        <ul className="space-y-6">
                                            {activeProject.details.map((detail, idx) => (
                                                <li key={idx} className="flex gap-6">
                                                    <div className="mt-1.5 shrink-0 text-[#0b6b3a]">
                                                        <FiCheckCircle className="w-6 h-6" />
                                                    </div>
                                                    <p className="text-gray-600 leading-relaxed text-base md:text-xl font-medium">
                                                        {detail}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                                        {activeProject.link && activeProject.link !== "#" && (
                                            <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#0b6b3a] text-white font-bold px-10 py-5 rounded-2xl hover:bg-[#074d29] transition-all hover:scale-105 shadow-xl shadow-green-900/10 text-lg">
                                                <FiExternalLink className="w-5 h-5" />
                                                <span>Visit Project</span>
                                            </a>
                                        )}
                                        {activeProject.github && activeProject.github !== "#" && (
                                            <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white text-gray-900 font-bold px-10 py-5 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all hover:scale-105 shadow-md text-lg">
                                                <FiGithub className="w-5 h-5" />
                                                <span>View Source</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {/* ─── CUSTOM STYLES ─────────────────────────────── */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
