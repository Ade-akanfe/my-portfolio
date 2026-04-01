"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const ring1Ref = useRef<HTMLDivElement>(null);
    const badge1Ref = useRef<HTMLDivElement>(null);
    const aboutTextRef = useRef<HTMLDivElement>(null);
    const skillsTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        if (!section) return;

        let mm = gsap.matchMedia(sectionRef);

        // -- DESKTOP ANIMATION --
        mm.add("(min-width: 1024px)", () => {
            gsap.set(img1Ref.current, { left: "42%", xPercent: -50, yPercent: -50, top: "58%", scale: 0.8, opacity: 1 });
            gsap.set(img2Ref.current, { left: "58%", xPercent: -50, yPercent: -50, top: "58%", scale: 0.8, opacity: 1 });
            gsap.set(aboutTextRef.current, { left: "var(--text-left)", right: "0", top: "58%", x: 50, yPercent: -50, opacity: 0 });
            gsap.set(skillsTextRef.current, { left: "var(--text-left)", right: "0", top: "58%", x: 50, yPercent: -50, opacity: 0 });
            gsap.set(badge1Ref.current, { scale: 0, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: { trigger: section, pin: true, scrub: 1.2, start: "top top", end: "+=400%" }
            });

            // Phase 1 — About EXPAND
            tl.to(img1Ref.current, { left: "0%", xPercent: 0, scale: 1, duration: 1, ease: "power2.out" }, 0)
                .to(img2Ref.current, { opacity: 0, scale: 0.5, x: 50, duration: 0.6 }, 0)
                .to(aboutTextRef.current, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0.2)
                .to(badge1Ref.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 0.7);

            // Phase 2 — About COLLAPSE
            tl.to(img1Ref.current, { left: "42%", xPercent: -50, scale: 0.8, duration: 1, ease: "power2.inOut" }, 1.5)
                .to(img2Ref.current, { left: "58%", opacity: 1, scale: 0.8, x: 0, duration: 0.8 }, 1.7)
                .to(aboutTextRef.current, { x: 50, opacity: 0, duration: 0.7, ease: "power2.in" }, 1.5)
                .to(badge1Ref.current, { scale: 0, opacity: 0, duration: 0.3 }, 1.5);

            // Phase 3 — Skills EXPAND
            tl.to(img2Ref.current, { left: "0%", xPercent: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, 2.5)
                .to(img1Ref.current, { opacity: 0, scale: 0.5, x: -50, duration: 0.6 }, 2.5)
                .to(skillsTextRef.current, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, 2.7);

            // Phase 4 — Skills COLLAPSE
            tl.to(img2Ref.current, { left: "58%", xPercent: -50, scale: 0.8, duration: 1, ease: "power2.inOut" }, 3.8)
                .to(img1Ref.current, { left: "42%", opacity: 1, xPercent: -50, scale: 0.8, x: 0, duration: 0.8 }, 4.0)
                .to(skillsTextRef.current, { x: 50, opacity: 0, duration: 0.7, ease: "power2.in" }, 3.8);
        });

        // -- TABLET & SMALL DESKTOP --
        mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
            gsap.set(img1Ref.current, { left: "40%", xPercent: -50, yPercent: -50, top: "45%", scale: 0.7, opacity: 1 });
            gsap.set(img2Ref.current, { left: "60%", xPercent: -50, yPercent: -50, top: "45%", scale: 0.7, opacity: 1 });
            gsap.set(aboutTextRef.current, { left: "50%", xPercent: -50, top: "75%", yPercent: -50, opacity: 0, textAlign: "center" });
            gsap.set(skillsTextRef.current, { left: "50%", xPercent: -50, top: "75%", yPercent: -50, opacity: 0, textAlign: "center" });

            const tl = gsap.timeline({
                scrollTrigger: { trigger: section, pin: true, scrub: 1.2, start: "top top", end: "+=400%" }
            });

            tl.to(img1Ref.current, { top: "35%", scale: 0.9, duration: 1 }, 0)
                .to(img2Ref.current, { opacity: 0, scale: 0.5, duration: 0.5 }, 0)
                .to(aboutTextRef.current, { opacity: 1, y: -20, duration: 0.8 }, 0.3);

            tl.to(img1Ref.current, { top: "45%", scale: 0.7, duration: 1 }, 1.5)
                .to(img2Ref.current, { opacity: 1, scale: 0.7, duration: 1 }, 1.5)
                .to(aboutTextRef.current, { opacity: 0, y: 0, duration: 0.5 }, 1.5);

            tl.to(img2Ref.current, { top: "35%", scale: 0.9, duration: 1 }, 2.5)
                .to(img1Ref.current, { opacity: 0, scale: 0.5, duration: 0.5 }, 2.5)
                .to(skillsTextRef.current, { opacity: 1, y: -20, duration: 0.8 }, 2.8);

            tl.to(img2Ref.current, { top: "45%", scale: 0.7, duration: 1 }, 3.8)
                .to(img1Ref.current, { opacity: 1, scale: 0.7, duration: 1 }, 3.8)
                .to(skillsTextRef.current, { opacity: 0, y: 0, duration: 0.5 }, 3.8);
        });

        // -- MOBILE ANIMATION --
        mm.add("(max-width: 767px)", () => {
            gsap.set(img1Ref.current, { left: "50%", xPercent: -50, yPercent: -50, top: "45%", x: 0, scale: 1.0, opacity: 1, zIndex: 2 });
            gsap.set(img2Ref.current, { left: "50%", xPercent: -50, yPercent: -50, top: "45%", x: 10, scale: 1.0, opacity: 1, zIndex: 1 });
            gsap.set(aboutTextRef.current, {
                left: "1.5rem", right: "1.5rem", top: "70%", xPercent: 0, yPercent: -50, y: 20, opacity: 0, display: "none", zIndex: 10
            });
            gsap.set(skillsTextRef.current, {
                left: "1.5rem", right: "1.5rem", top: "72%", xPercent: 0, yPercent: -50, y: 20, opacity: 0, display: "none", zIndex: 10
            });
            gsap.set(badge1Ref.current, { scale: 0, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: { trigger: section, pin: true, scrub: 1.5, start: "top top", end: "+=400%" }
            });

            // Phase 1 — About EXPAND
            tl.set(aboutTextRef.current, { display: "flex" }, 0)
                .to(img1Ref.current, { top: "30%", scale: 1.05, x: 0, duration: 1, ease: "power2.out" }, 0)
                .to(img2Ref.current, { opacity: 0, scale: 0.5, x: 200, duration: 0.7 }, 0)
                .to(aboutTextRef.current, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0.2)
                .to(badge1Ref.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 0.7);

            // Phase 2 — About COLLAPSE
            tl.to(img1Ref.current, { top: "45%", scale: 1.0, x: 0, duration: 1, ease: "power2.inOut" }, 1.5)
                .to(img2Ref.current, { opacity: 1, scale: 1.0, x: 10, duration: 0.8 }, 1.7)
                .to(aboutTextRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power2.in" }, 1.5)
                .set(aboutTextRef.current, { display: "none" }, 2.3)
                .to(badge1Ref.current, { scale: 0, opacity: 0, duration: 0.3 }, 1.5);

            // Phase 3 — Skills EXPAND
            tl.set(skillsTextRef.current, { display: "flex" }, 2.4)
                .to(img2Ref.current, { top: "24%", x: 0, scale: 1.05, opacity: 1, duration: 1, ease: "power2.out" }, 2.5)
                .to(img1Ref.current, { opacity: 0, x: -200, scale: 0.5, duration: 0.7 }, 2.5)
                .to(skillsTextRef.current, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 2.7);

            // Phase 4 — Skills COLLAPSE
            tl.to(img2Ref.current, { top: "45%", x: 10, scale: 1.0, duration: 1, ease: "power2.inOut" }, 3.8)
                .to(img1Ref.current, { opacity: 1, top: "45%", x: 0, scale: 1.0, duration: 0.8 }, 4.0)
                .to(skillsTextRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power2.in" }, 3.8)
                .set(skillsTextRef.current, { display: "none" }, 4.6);
        });

        // The float animations can run regardless of media query
        const floatCtx = gsap.context(() => {
            gsap.to(".portrait-float", { y: -10, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true });
            gsap.to(ring1Ref.current, { rotate: 360, duration: 10, ease: "none", repeat: -1 });
            gsap.to(ring1Ref.current, { scale: 1.05, duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true });
        }, section);

        return () => {
            mm.revert();
            floatCtx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative w-full h-screen min-h-[900px] md:h-screen overflow-hidden bg-[#fcf8ef] touch-none"
            style={{
                fontFamily: "'Inter', sans-serif",
                "--img-w": "clamp(240px, 45vw, 400px)",
                "--text-left": "calc(var(--img-w) + 6vw)",
            } as React.CSSProperties}
        >
            {/* Background blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-[#0b6b3a]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Heading — fixed at top, always visible */}
            <div className="absolute top-2 md:top-12 left-0 right-0 text-center z-20 pointer-events-none px-6">
                <p className="text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#0b6b3a] mb-1 md:mb-3 opacity-80">My Narrative</p>
                <h2
                    className="text-xl md:text-5xl lg:text-7xl font-black text-gray-800 leading-[1.1]"
                    style={{ letterSpacing: "-0.03em" }}
                >
                    Building products that<br />
                    <span className="italic text-[#0b6b3a]">actually matter</span>
                </h2>
            </div>

            {/* ── Animation stage ─────────────────────────────── */}
            <div className="absolute inset-0 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">

                {/* ────── Image 1 — About ────────────────────────── */}
                <div
                    ref={img1Ref}
                    className="absolute"
                    style={{ width: "var(--img-w)" }}
                >
                    {/* Rotating gradient ring */}
                    <div
                        ref={ring1Ref}
                        className="absolute inset-[-12px] md:inset-[-15px] pointer-events-none"
                        style={{
                            background: "conic-gradient(from 0deg,#0b6b3a,#34d399,#fbbf24,#f43f5e,#818cf8,#0b6b3a)",
                            borderRadius: "40px",
                            padding: "3px",
                            WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                        }}
                    />
                    {/* Portrait */}
                    <div
                        className="portrait-float relative rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
                        style={{ aspectRatio: "4/5" }}
                    >
                        <Image
                            src="/images/portrait-image.png"
                            alt="About Portrait"
                            fill
                            className="object-cover object-top scale-110"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0b6b3a]/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                    {/* Available badge */}
                    <div
                        ref={badge1Ref}
                        className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl md:rounded-3xl shadow-2xl px-3 md:px-5 py-2 md:py-4 flex items-center gap-2 md:gap-3 border border-gray-100 z-10"
                    >
                        <span className="relative flex h-2.5 w-2.5 md:h-3.5 md:w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0b6b3a] opacity-75" />
                            <span className="relative inline-flex rounded-full h-full w-full bg-[#0b6b3a]" />
                        </span>
                        <div className="leading-tight">
                            <p className="text-[10px] md:text-sm font-black text-gray-800">Available</p>
                            <p className="text-[8px] md:text-[11px] text-gray-400 font-bold uppercase tracking-wider">For Projects</p>
                        </div>
                    </div>
                    {/* Dot grid decoration */}
                    <div className="absolute -top-8 -left-8 grid-cols-4 gap-2 pointer-events-none opacity-20 hidden md:grid">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-[#0b6b3a]" />
                        ))}
                    </div>
                </div>

                {/* ────── Image 2 — Skills ────────────────────────── */}
                <div
                    ref={img2Ref}
                    className="absolute"
                    style={{ width: "var(--img-w)" }}
                >
                    <div
                        className="portrait-float relative rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
                        style={{ aspectRatio: "4/5" }}
                    >
                        <Image
                            src="/images/portrait-2.png"
                            alt="Skills Portrait"
                            fill
                            className="object-cover object-top scale-110"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-orange-400/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                    {/* Skills badge */}
                    <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl md:rounded-3xl shadow-2xl px-3 md:px-5 py-2 md:py-4 flex items-center gap-2 md:gap-3 border border-gray-100 z-10">
                        <span className="text-lg md:text-2xl">⚡</span>
                        <div className="leading-tight">
                            <p className="text-[10px] md:text-sm font-black text-gray-800">Expertise</p>
                            <p className="text-[8px] md:text-[11px] text-gray-400 font-bold uppercase tracking-wider">Stack & Tools</p>
                        </div>
                    </div>
                </div>

                {/* ────── About text panel ────────────────────────── */}
                <div
                    ref={aboutTextRef}
                    className="absolute flex flex-col gap-4 md:gap-8 max-w-xl"
                >
                    <div className="space-y-4 md:space-y-6 text-gray-600 leading-relaxed text-sm md:text-lg">
                        <p>
                            My name is <span className="font-bold text-gray-900 border-b-2 border-green-200">Ade-akanfe Ademola</span>, a software engineer specialized in crafting high-performance, accessible web
                            experiences. My toolkit revolves around <span className="font-bold text-gray-900 border-b-2 border-green-200">Next.js, Node.js, and TypeScript</span>.
                        </p>

                        <p className="hidden sm:block">
                            I recently spearheaded the development of a <span className="italic font-medium">school management ecosystem</span> that
                            automated workflows for 1,000+ users, significantly reducing manual data entry errors.
                        </p>
                        <p>
                            I thrive at the intersection of <span className="text-[#0b6b3a] font-bold">clean code</span> and
                            <span className="text-[#0b6b3a] font-bold"> impact-driven design</span>.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-10 pt-4 md:pt-8 border-t border-gray-100">
                        {[
                            { value: "4+", label: "Years Exp" },
                            { value: "24", label: "Projects" },
                            { value: "30%", label: "Eficiency Boost" },
                        ].map(s => (
                            <div key={s.label} className="flex flex-col">
                                <span className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight">{s.value}</span>
                                <span className="text-[9px] md:text-xs uppercase font-bold text-gray-400 tracking-widest mt-1">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2">
                        <button className="bg-[#0b6b3a] hover:bg-[#074d29] text-white font-bold px-6 md:px-10 py-3 md:py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/40 text-xs md:text-sm">
                            Work With Me
                        </button>
                        <button className="bg-white hover:bg-gray-50 text-gray-800 font-bold px-6 md:px-10 py-3 md:py-4 rounded-2xl border border-gray-200 transition-all text-xs md:text-sm">
                            View Resume
                        </button>
                    </div>
                </div>

                {/* ────── Skills text panel ───────────────────────── */}
                <div
                    ref={skillsTextRef}
                    className="absolute flex flex-col gap-4 md:gap-6 max-w-xl"
                >
                    <div className="space-y-2 md:space-y-4">
                        <p className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">Full-Stack Capability.</p>
                        <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                            Optimized for speed, scalability, and maintainability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-y-auto max-h-[400px] md:max-h-none pr-2 custom-scrollbar">
                        {[
                            { label: "Languages", color: "bg-red-500", skills: ["Python", "C", "JS/TS", "Rust", "Bash", "SQL"] },
                            { label: "Frontend", color: "bg-[#0b6b3a]", skills: ["React", "Next.js", "Tailwind", "Redux", "Sass"] },
                            { label: "Backend", color: "bg-blue-600", skills: ["Node.js", "Express", "NestJS", "JWT", "OAuth"] },
                            { label: "Databases", color: "bg-purple-600", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"] },
                            { label: "DevOps", color: "bg-orange-600", skills: ["AWS", "Docker", "Kubernetes", "Nginx", "Linux", "Actions"] },
                            { label: "Testing", color: "bg-pink-600", skills: ["Jest", "Mocha", "Unit Testing", "CI Pipelines"] },
                        ].map(cat => (
                            <div key={cat.label} className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className={`inline-block ${cat.color} text-white text-[9px] md:text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wider`}>
                                    {cat.label}
                                </div>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {cat.skills.map(sk => (
                                        <span key={sk} className="text-[10px] md:text-xs text-gray-700 bg-white/80 border border-gray-100 rounded-lg px-2 md:px-3 py-1 font-medium shadow-xs whitespace-nowrap">
                                            {sk}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
