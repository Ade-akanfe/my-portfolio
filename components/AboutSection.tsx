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


    const setScrollToContact = () => {
        // this should take you to contact page in the landing page
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }



    }

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        if (!section) return;

        let mm = gsap.matchMedia(sectionRef);

        // -- DESKTOP ANIMATION --
        mm.add("(min-width: 1024px)", () => {
            gsap.set(img1Ref.current, { left: "42%", xPercent: -50, yPercent: -50, top: "58%", scale: 0.8, opacity: 1, position: "absolute" });
            gsap.set(img2Ref.current, { left: "58%", xPercent: -50, yPercent: -50, top: "58%", scale: 0.8, opacity: 1, position: "absolute" });
            gsap.set(aboutTextRef.current, { left: "var(--text-left)", right: "0", top: "58%", x: 50, yPercent: -50, autoAlpha: 0, position: "absolute" });
            gsap.set(skillsTextRef.current, { left: "var(--text-left)", right: "0", top: "58%", x: 50, yPercent: -50, autoAlpha: 0, position: "absolute" });
            gsap.set(badge1Ref.current, { scale: 0, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: { trigger: section, pin: true, scrub: 1.2, start: "top top", end: "+=400%" }
            });

            // Phase 1 — About EXPAND
            tl.to(img1Ref.current, { left: "0%", xPercent: 0, scale: 1, duration: 1, ease: "power2.out" }, 0)
                .to(img2Ref.current, { opacity: 0, scale: 0.5, x: 50, duration: 0.6 }, 0)
                .to(aboutTextRef.current, { x: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }, 0.2)
                .to(badge1Ref.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 0.7);

            // Phase 2 — About COLLAPSE
            tl.to(img1Ref.current, { left: "42%", xPercent: -50, scale: 0.8, duration: 1, ease: "power2.inOut" }, 1.5)
                .to(img2Ref.current, { left: "58%", opacity: 1, scale: 0.8, x: 0, duration: 0.8 }, 1.7)
                .to(aboutTextRef.current, { x: 50, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, 1.5)
                .to(badge1Ref.current, { scale: 0, opacity: 0, duration: 0.3 }, 1.5);

            // Phase 3 — Skills EXPAND
            tl.to(img2Ref.current, { left: "0%", xPercent: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, 2.5)
                .to(img1Ref.current, { opacity: 0, scale: 0.5, x: -50, duration: 0.6 }, 2.5)
                .to(skillsTextRef.current, { x: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }, 2.7);

            // Phase 4 — Skills COLLAPSE
            tl.to(img2Ref.current, { left: "58%", xPercent: -50, scale: 0.8, duration: 1, ease: "power2.inOut" }, 3.8)
                .to(img1Ref.current, { left: "42%", opacity: 1, xPercent: -50, scale: 0.8, x: 0, duration: 0.8 }, 4.0)
                .to(skillsTextRef.current, { x: 50, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, 3.8);
        });

        // -- TABLET (iPad) --
        mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
            gsap.set(img1Ref.current, { left: "40%", xPercent: -50, yPercent: -50, top: "45%", scale: 0.7, opacity: 1, position: "absolute" });
            gsap.set(img2Ref.current, { left: "60%", xPercent: -50, yPercent: -50, top: "45%", scale: 0.7, opacity: 1, position: "absolute" });
            gsap.set(aboutTextRef.current, { left: "50%", xPercent: -50, top: "75%", yPercent: -50, autoAlpha: 0, textAlign: "center", position: "absolute" });
            gsap.set(skillsTextRef.current, { left: "50%", xPercent: -50, top: "75%", yPercent: -50, autoAlpha: 0, textAlign: "center", position: "absolute" });

            const tl = gsap.timeline({
                scrollTrigger: { trigger: section, pin: true, scrub: 1.2, start: "top top", end: "+=400%" }
            });

            tl.to(img1Ref.current, { top: "35%", scale: 0.9, duration: 1 }, 0)
                .to(img2Ref.current, { opacity: 0, scale: 0.5, duration: 0.5 }, 0)
                .to(aboutTextRef.current, { autoAlpha: 1, y: -20, duration: 0.8 }, 0.3);

            tl.to(img1Ref.current, { top: "45%", scale: 0.7, duration: 1 }, 1.5)
                .to(img2Ref.current, { opacity: 1, scale: 0.7, duration: 1 }, 1.5)
                .to(aboutTextRef.current, { autoAlpha: 0, y: 0, duration: 0.5 }, 1.5);

            tl.to(img2Ref.current, { top: "35%", scale: 0.9, duration: 1 }, 2.5)
                .to(img1Ref.current, { opacity: 0, scale: 0.5, duration: 0.5 }, 2.5)
                .to(skillsTextRef.current, { autoAlpha: 1, y: -20, duration: 0.8 }, 2.8);

            tl.to(img2Ref.current, { top: "45%", scale: 0.7, duration: 1 }, 3.8)
                .to(img1Ref.current, { opacity: 1, scale: 0.7, duration: 1 }, 3.8)
                .to(skillsTextRef.current, { autoAlpha: 0, y: 0, duration: 0.5 }, 3.8);
        });

        // -- MOBILE ANIMATION (Stacked, Normal Scroll) --
        mm.add("(max-width: 767px)", () => {
            // Strip absolute positioning constraints to let flexbox stack them
            gsap.set([img1Ref.current, aboutTextRef.current, img2Ref.current, skillsTextRef.current, badge1Ref.current], {
                clearProps: "all"
            });

            // Smooth fade-up as user scrolls normally down the page
            gsap.from(img1Ref.current, {
                scrollTrigger: { trigger: img1Ref.current, start: "top 85%" },
                y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
            });
            gsap.from(aboutTextRef.current, {
                scrollTrigger: { trigger: aboutTextRef.current, start: "top 85%" },
                y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
            });
            gsap.from(img2Ref.current, {
                scrollTrigger: { trigger: img2Ref.current, start: "top 85%" },
                y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
            });
            gsap.from(skillsTextRef.current, {
                scrollTrigger: { trigger: skillsTextRef.current, start: "top 85%" },
                y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
            });
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
            // Mobile: tighten the vertical padding to remove massive top/bottom space. Desktop: fixed h-screen.
            className="relative w-full min-h-screen md:h-screen h-auto md:overflow-hidden bg-[#fcf8ef] py-16 md:py-0"
            style={{
                fontFamily: "'Inter', sans-serif",
                "--img-w": "clamp(240px, 45vw, 400px)",
                "--text-left": "calc(var(--img-w) + 6vw)",
            } as React.CSSProperties}
        >
            {/* Background blobs */}
            <div className="absolute top-[-5%] right-[-10%] w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#0b6b3a]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Heading — Top fixed on desktop, flows gracefully on mobile (reduced mb-16 to mb-8) */}
            <div className="md:absolute top-2 md:top-12 left-0 right-0 text-center z-20 pointer-events-none px-6 mb-8 md:mb-0">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#0b6b3a] mb-2 md:mb-3 opacity-80">My Narrative</p>
                <h2
                    className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-800 leading-[1.1]"
                    style={{ letterSpacing: "-0.03em" }}
                >
                    Building products that<br />
                    <span className="italic text-[#0b6b3a]">actually matter</span>
                </h2>
            </div>

            {/* ── Desktop Animation Stage / Mobile Flex Stack (reduced gap-16 to gap-10) ── */}
            <div className="relative md:absolute inset-0 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col md:block gap-10 md:gap-0 mt-8 md:mt-0 z-10 w-full">

                {/* ────── Image 1 — About ────────────────────────── */}
                <div
                    ref={img1Ref}
                    className="relative md:absolute mx-auto md:mx-0 shrink-0 w-[240px] md:w-(--img-w)"
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
                        className="portrait-float relative rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] w-full"
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
                        className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl md:rounded-3xl shadow-2xl px-4 py-3 md:px-5 md:py-4 flex items-center gap-2 md:gap-3 border border-gray-100 z-10"
                    >
                        <span className="relative flex h-3 w-3 md:h-3.5 md:w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0b6b3a] opacity-75" />
                            <span className="relative inline-flex rounded-full h-full w-full bg-[#0b6b3a]" />
                        </span>
                        <div className="leading-tight">
                            <p className="text-[11px] md:text-sm font-black text-gray-800">Available</p>
                            <p className="text-[9px] md:text-[11px] text-gray-400 font-bold uppercase tracking-wider">For Projects</p>
                        </div>
                    </div>
                </div>

                {/* ────── About text panel ────────────────────────── */}
                <div
                    ref={aboutTextRef}
                    className="relative md:absolute flex flex-col gap-4 md:gap-8 w-full md:max-w-xl mx-auto md:mx-0 bg-white/40 md:bg-transparent rounded-3xl md:rounded-none p-6 md:p-0 shadow-sm md:shadow-none border border-white/60 md:border-none backdrop-blur-md md:backdrop-blur-none"
                >
                    <div className="space-y-4 md:space-y-6 text-gray-600 leading-relaxed text-[15px] md:text-lg">
                        <p>
                            My name is <span className="font-bold text-gray-900 border-b-2 border-green-200">Ade-akanfe Ademola</span>, a software engineer specialized in crafting high-performance, accessible web
                            experiences. My toolkit revolves around <span className="font-bold text-gray-900 border-b-2 border-green-200">Next.js, Node.js, and TypeScript</span>.
                        </p>
                        <p>
                            I recently spearheaded the development of a <span className="italic font-medium text-gray-800">school management ecosystem</span> that
                            automated workflows for 1,000+ users, significantly reducing manual data entry errors.
                        </p>
                        <p>
                            I thrive at the intersection of <span className="text-[#0b6b3a] font-bold">clean code</span> and
                            <span className="text-[#0b6b3a] font-bold"> impact-driven design</span>.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-10 pt-4 md:pt-8 border-t border-gray-100 md:border-gray-200">
                        {[
                            { value: "4+", label: "Years Exp" },
                            { value: "10+", label: "Projects" },
                            { value: "30%", label: "Eficiency Boost" },
                        ].map(s => (
                            <div key={s.label} className="flex flex-col">
                                <span className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight">{s.value}</span>
                                <span className="text-[9px] md:text-xs uppercase font-bold text-gray-400 tracking-widest mt-1">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2">
                        <button onClick={setScrollToContact} className="cursor-pointer bg-[#0b6b3a] hover:bg-[#074d29] text-white font-bold px-6 md:px-10 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/40 text-[15px] md:text-sm">
                            Work With Me
                        </button>
                        <a href="/docs/ade-akanfe.pdf" target="_blank" rel="noopener noreferrer" className="inline-block text-center cursor-pointer bg-white hover:bg-gray-50 text-gray-800 font-bold px-6 md:px-10 py-4 rounded-2xl border border-gray-200 transition-all text-[15px] md:text-sm">
                            View Resume
                        </a>
                    </div>
                </div>

                {/* ────── Image 2 — Skills (removed mt-10 so gap manages spacing) ────────────────────────── */}
                <div
                    ref={img2Ref}
                    className="relative md:absolute mx-auto md:mx-0 shrink-0 w-[240px] md:w-(--img-w)"
                >
                    <div
                        className="portrait-float relative rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] w-full"
                        style={{ aspectRatio: "4/5" }}
                    >
                        <Image
                            src="/images/portrait-2.png"
                            alt="Skills Portrait"
                            fill
                            className="object-cover object-top scale-110"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-orange-400/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                    {/* Skills badge */}
                    <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl md:rounded-3xl shadow-2xl px-4 py-3 md:px-5 md:py-4 flex items-center gap-2 md:gap-3 border border-gray-100 z-10">
                        <span className="text-xl md:text-2xl">⚡</span>
                        <div className="leading-tight">
                            <p className="text-[11px] md:text-sm font-black text-gray-800">Expertise</p>
                            <p className="text-[9px] md:text-[11px] text-gray-400 font-bold uppercase tracking-wider">Stack & Tools</p>
                        </div>
                    </div>
                </div>

                {/* ────── Skills text panel (reduced pb-16 to pb-4) ───────────────────────── */}
                <div
                    ref={skillsTextRef}
                    className="relative md:absolute flex flex-col gap-6 md:gap-6 w-full md:max-w-xl mx-auto md:mx-0 pb-4 md:pb-0"
                >
                    <div className="space-y-2 md:space-y-4 text-center md:text-left">
                        <p className="text-3xl md:text-3xl font-black text-gray-900 tracking-tight">Full-Stack Capability.</p>
                        <p className="text-gray-500 leading-relaxed text-[15px] md:text-base">
                            Optimized for speed, scalability, and maintainability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {[
                            { label: "Languages", color: "bg-red-500", skills: ["Python", "C", "JS/TS", "Rust", "Bash", "SQL"] },
                            { label: "Frontend", color: "bg-[#0b6b3a]", skills: ["React", "Next.js", "Tailwind", "Redux", "Sass"] },
                            { label: "Backend", color: "bg-blue-600", skills: ["Node.js", "Express", "NestJS", "JWT", "OAuth"] },
                            { label: "Databases", color: "bg-purple-600", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"] },
                            { label: "DevOps", color: "bg-orange-600", skills: ["AWS", "Docker", "Kubernetes", "Nginx", "Linux", "Actions"] },
                            { label: "Testing", color: "bg-pink-600", skills: ["Jest", "Mocha", "Unit Testing", "CI Pipelines"] },
                        ].map(cat => (
                            <div key={cat.label} className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl md:rounded-3xl p-5 md:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                                <div className={`inline-block ${cat.color} text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wider self-start`}>
                                    {cat.label}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map(sk => (
                                        <span key={sk} className="text-[11px] md:text-xs text-gray-700 bg-white/80 border border-gray-100 rounded-lg px-2.5 md:px-3 py-1 font-semibold shadow-xs whitespace-nowrap">
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
