"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks: { title: string; type: "circle" | "zigzag" | "wave" | "bounce"; id: string }[] = [
    { title: "About Me", type: "circle", id: "about" },
    { title: "Contact Me", type: "zigzag", id: "contact" },
    { title: "Projects", type: "wave", id: "projects" },
    { title: "Support", type: "bounce", id: "support" },
];

// NavLink for the desktop pill bar
const NavLink = ({ title, type, id, onClick }: { title: string; type: "circle" | "zigzag" | "wave" | "bounce"; id: string; onClick: (id: string) => void }) => {
    return (
        <button
            onClick={() => onClick(id)}
            className="relative group cursor-pointer px-4 py-2 text-gray-700 hover:text-[#0b6b3a] transition-colors font-semibold bg-transparent border-none outline-none"
        >
            <span className="relative z-10">{title}</span>

            {type === "circle" && (
                <svg className="absolute inset-0 w-full h-full text-orange-500 z-0 pointer-events-none overflow-visible" fill="none" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M 25,12 C 50,5 85,5 92,18 C 98,30 70,38 35,36 C 8,34 5,20 15,10 C 25,5 50,8 60,12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ strokeDasharray: 250, strokeDashoffset: 250, transitionProperty: "stroke-dashoffset, opacity" }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:[stroke-dashoffset:0px]!"
                    />
                </svg>
            )}
            {type === "zigzag" && (
                <svg className="absolute left-0 -bottom-1 w-full h-3 text-yellow-500 z-0 pointer-events-none overflow-visible" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,6 L10,1 L20,11 L30,1 L40,11 L50,1 L60,11 L70,1 L80,11 L90,1 L100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ strokeDasharray: 160, strokeDashoffset: 160, transitionProperty: "stroke-dashoffset, opacity" }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:[stroke-dashoffset:0px]!"
                    />
                </svg>
            )}
            {type === "wave" && (
                <svg className="absolute left-0 -bottom-1 w-full h-3 text-pink-500 z-0 pointer-events-none overflow-visible" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,6 Q12.5,0 25,6 T50,6 T75,6 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        style={{ strokeDasharray: 130, strokeDashoffset: 130, transitionProperty: "stroke-dashoffset, opacity" }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:[stroke-dashoffset:0px]!"
                    />
                </svg>
            )}
            {type === "bounce" && (
                <span className="absolute left-4 right-4 bottom-0 h-[3px] bg-blue-500 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] z-0 pointer-events-none"></span>
            )}
        </button>
    );
};

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 80; 
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setDrawerOpen(false);
        }
    };

    // Desktop scroll/position logic
    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const heroEl = document.getElementById("hero-section");
        const isHomePage = !!heroEl;
        const isMobile = window.innerWidth < 1024;

        if (isMobile) {
            gsap.set(nav, { top: "2vh" });
            gsap.fromTo(nav,
                { y: -60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
            );
            return;
        }

        gsap.set(nav, { top: isHomePage ? "80px" : "15px" });
        gsap.fromTo(nav,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.4)", delay: 0.2 }
        );

        const handleScroll = () => {
            if (window.scrollY > 50) {
                gsap.to(nav, { top: "20px", duration: 0.3, ease: "power2.out", overwrite: "auto" });
            } else {
                gsap.to(nav, { top: isHomePage ? "80px" : "15px", duration: 0.3, ease: "power2.out", overwrite: "auto" });
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Drawer open/close animation
    useEffect(() => {
        const drawer = drawerRef.current;
        const overlay = overlayRef.current;
        if (!drawer || !overlay) return;

        if (drawerOpen) {
            document.body.style.overflow = "hidden";
            gsap.set(overlay, { display: "block" });
            gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
            gsap.fromTo(drawer,
                { x: "100%" },
                { x: "0%", duration: 0.4, ease: "power3.out" }
            );
        } else {
            document.body.style.overflow = "";
            gsap.to(overlay, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => { if (overlay) gsap.set(overlay, { display: "none" }); } });
            gsap.to(drawer, { x: "100%", duration: 0.35, ease: "power3.in" });
        }
    }, [drawerOpen]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

                @keyframes pulseAndColor {
                    0%, 100% { transform: scale(1); background-color: #fbbf24; }
                    33% { transform: scale(1.3); background-color: #10b981; }
                    66% { transform: scale(0.8); background-color: #f43f5e; }
                }
                .animate-pulse-color { animation: pulseAndColor 3s infinite ease-in-out; }

                .drawer-link {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    color: #1a1a1a;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #f0f0f0;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: color 0.2s, padding-left 0.2s;
                }
                .drawer-link:hover { color: #0b6b3a; padding-left: 0.5rem; }
                .drawer-link:last-child { border-bottom: none; }

                .hamburger-line {
                    display: block;
                    width: 22px;
                    height: 2.5px;
                    background: #1a1a1a;
                    border-radius: 2px;
                    transition: all 0.3s ease;
                    transform-origin: center;
                }
                .hamburger-open .hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
                .hamburger-open .hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
                .hamburger-open .hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
            `}</style>

            <nav
                ref={navRef}
                className="fixed left-0 right-0 z-50 px-4 lg:px-10"
                style={{ opacity: 0, fontFamily: "'Inter', sans-serif" }}
            >
                <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-4 sm:px-5">

                    {/* Logo */}
                    <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="bg-[#0b6b3a] text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm tracking-wide">
                            <div className="w-3 h-3 rounded-full animate-pulse-color"></div>
                            DEMO
                        </div>
                    </div>

                    {/* Desktop nav links */}
                    <div className="hidden lg:flex items-center bg-white/90 backdrop-blur-md border border-white/50 shadow-md rounded-full px-8 py-3 gap-0">
                        {navLinks.map(l => (
                            <NavLink key={l.title} title={l.title} type={l.type} id={l.id} onClick={scrollToSection} />
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => scrollToSection("contact")}
                            className="hidden sm:flex border font-semibold bg-white/90 border-gray-300 rounded-full px-7 py-3 text-sm items-center gap-2 hover:bg-gray-50 transition-colors text-gray-700 cursor-pointer"
                        >
                            💼 Hire Me
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            id="mobile-menu-btn"
                            onClick={() => setDrawerOpen(v => !v)}
                            className={`lg:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-md cursor-pointer ${drawerOpen ? "hamburger-open" : ""}`}
                            aria-label="Toggle menu"
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </nav>

            <div
                ref={overlayRef}
                onClick={() => setDrawerOpen(false)}
                className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm"
                style={{ display: "none", opacity: 0 }}
            />

            <div
                ref={drawerRef}
                className="fixed top-0 right-0 z-70 h-full w-[min(85vw,340px)] bg-white shadow-2xl flex flex-col"
                style={{ transform: "translateX(100%)", fontFamily: "'Inter', sans-serif" }}
            >
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="bg-[#0b6b3a] text-white font-bold px-5 py-2.5 rounded-full flex items-center gap-2 text-sm tracking-wide">
                        <div className="w-2.5 h-2.5 rounded-full animate-pulse-color"></div>
                        Demo
                    </div>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer text-gray-600"
                        aria-label="Close menu"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 px-6 py-6 flex flex-col gap-0 overflow-y-auto justify-evenly">
                    {[
                        { icon: "👤", label: "About Me", id: "about" },
                        { icon: "📩", label: "Contact Me", id: "contact" },
                        { icon: "🛠️", label: "Projects", id: "projects" },
                        { icon: "☕", label: "Support", id: "support" },
                    ].map(item => (
                        <button
                            key={item.label}
                            onClick={() => scrollToSection(item.id)}
                            className="drawer-link w-full text-left bg-transparent border-0 outline-none"
                        >
                            <span className="text-xl">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="px-6 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-3">
                    <button 
                        onClick={() => scrollToSection("support")}
                        className="w-full bg-[#0b6b3a] hover:bg-[#095c32] text-white font-bold px-6 py-4 rounded-full transition-all duration-200 hover:scale-[1.02] text-base cursor-pointer"
                    >
                        ☕ Fuel My Work
                    </button>
                    <button 
                        onClick={() => scrollToSection("contact")}
                        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold px-6 py-4 rounded-full border border-gray-200 transition-all duration-200 hover:scale-[1.02] text-base cursor-pointer"
                    >
                        💼 Hire Me
                    </button>
                </div>

                <div className="h-1 w-full bg-linear-to-r from-[#0b6b3a] via-yellow-400 to-pink-400"></div>
            </div>
        </>
    );
}
