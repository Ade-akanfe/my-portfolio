"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";


export default function HeroClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cloudLeftRef = useRef<HTMLDivElement>(null);
    const cloudRightRef = useRef<HTMLDivElement>(null);
    const cloudRightCenterRef = useRef<HTMLDivElement>(null);
    const welcomeRef = useRef<HTMLHeadingElement>(null);
    const portfolioRef = useRef<HTMLHeadingElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const wavyDividerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // --- Intro Text & Buttons Animation ---
        if (welcomeRef.current && portfolioRef.current && buttonsRef.current) {
            gsap.set([welcomeRef.current, portfolioRef.current], { y: 50, opacity: 0 });
            gsap.set(buttonsRef.current, { y: 80, opacity: 0 });

            const tl = gsap.timeline();

            tl.to(welcomeRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power4.out",
                delay: 0.2
            })
                .to(portfolioRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power4.out"
                }, "-=0.4")
                .to(buttonsRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: "power3.out"
                }, "+=1.0"); // Button delay adjusted
        }

        // --- Cloud Left Animation ---
        if (cloudLeftRef.current) {
            gsap.set(cloudLeftRef.current, { x: 0, opacity: 1, scale: 1 });
            gsap.to(cloudLeftRef.current, {
                x: 40,
                y: 5,
                scale: 1.05,
                duration: 1.6,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 0.2,
            });
        }

        // --- Cloud Right Animation ---
        if (cloudRightRef.current) {
            gsap.set(cloudRightRef.current, { x: 0, opacity: 1, scale: 1 });
            gsap.to(cloudRightRef.current, {
                x: -40,
                y: 5,
                scale: 1.05,
                duration: 1.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 0.5,
            });
        }

        // --- Cloud Right Center Animation ---
        if (cloudRightCenterRef.current) {
            gsap.set(cloudRightCenterRef.current, { x: 0, opacity: 1, scale: 1 });
            gsap.to(cloudRightCenterRef.current, {
                x: -50,
                y: -5,
                scale: 1.05,
                duration: 1.2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 0,
            });
        }

        // --- Animated Progressive Wavy Divider ---
        if (wavyDividerRef.current) {
            gsap.to(wavyDividerRef.current.querySelector('svg'), {
                x: '-50%', // Move half of the repeating 200% width
                duration: 10,
                ease: "none",
                repeat: -1
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div id="hero-section" ref={containerRef} className="relative w-full bg-[#fcf8ef] font-sans" style={{ height: 'calc(100vh + 25rem)' }}>
            {/* Background Image — full screen from top */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <picture className="w-full h-full">
                    <source media="(min-width: 768px)" srcSet="/images/landing-web.png" />
                    <Image width={1024} height={1024} src="/images/landing-mobile.png" alt="Cityscape background" className="absolute inset-0 w-full h-full object-cover object-[center_70%]" />
                </picture>
            </div>

            {/* Standalone Oversized Fluffy Cloud — Top Left (Oversized & Shadow XL) */}
           

            {/* Standalone Oversized Fluffy Cloud — Top Right (Oversized & Shadow XL) */}
            <div ref={cloudRightRef} className="absolute top-[-200px] right-[200px] z-10 pointer-events-none" style={{ width: '600px', filter: 'drop-shadow(0 35px 60px #b1f2ff) drop-shadow(0 0 60px #b1f2ff) drop-shadow(0 0 20px #b1f2ff)' }}>
                <svg viewBox="0 0 520 280" fill="#b1f2ff" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ transform: 'scaleX(-1)' }}>
                    {/* Flipped version of the standalone fluffy cloud */}
                    <path d="
                        M100,70
                        C 130,10 210,10 240,60
                        C 280,10 360,10 390,60
                        C 430,10 500,20 520,80
                        C 540,120 520,170 470,180
                        C 490,230 420,260 360,230
                        C 320,270 240,270 200,230
                        C -10,230 -20,170 20,130
                        C -20,80 30,30 100,70
                        Z
                    " />
                </svg>
            </div>

            {/* Standalone Oversized Fluffy Cloud — Right Center (Larger & Extra Glowing) */}
            {/* <div ref={cloudRightCenterRef} className="absolute top-[30%] right-[-50px] z-10 pointer-events-none" style={{ width: '370px', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.08)) drop-shadow(0 0 50px rgba(255,255,255,0.9))' }}>
                <svg viewBox="0 0 520 280" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ transform: 'scaleX(-1)' }}>
                    <path d="
                        M100,70
                        C 130,10 210,10 240,60
                        C 280,10 360,10 390,60
                        C 430,10 500,20 520,80
                        C 540,120 520,170 470,180
                        C 490,230 420,260 360,230
                        C 320,270 240,270 200,230
                        C -10,230 -20,170 20,130
                        C -20,80 30,30 100,70
                        Z
                    " />
                </svg>
            </div> */}

            {/* Animated Progressive Wavy Divider */}
            <div ref={wavyDividerRef} className="absolute bottom-0 left-0 w-full z-10 overflow-hidden pointer-events-none h-[200px]" >
                <svg viewBox="0 0 2880 300" preserveAspectRatio="none" className="w-[200%] h-full block fill-white">
                    <path d="
                        M0,100 
                        Q180,50 360,100 Q540,150 720,100 Q900,50 1080,100 Q1260,150 1440,100
                        Q1620,50 1800,100 Q1980,150 2160,100 Q2340,50 2520,100 Q2700,150 2880,100
                        V300 H0 Z
                    " />
                </svg>
            </div>

            {/* Text content */}
            <div className="absolute left-0 right-0 z-20 pointer-events-none
                            top-[120px] sm:top-[160px] md:top-[20%] 2xl:top-[22%]">
                <div className="text-center pointer-events-auto px-6 sm:px-8">
                    <h1
                        ref={welcomeRef}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-800 leading-none mb-6 sm:mb-8"
                        style={{ letterSpacing: '-0.04em', fontFamily: "'Inter', sans-serif" }}
                    >
                        Welcome to
                    </h1>
                    <h1
                        ref={portfolioRef}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl italic uppercase font-black text-[#0b6b3a] leading-none mb-12 sm:mb-16"
                        style={{ letterSpacing: '-0.04em', fontFamily: "'Inter', sans-serif" }}
                    >
                        my portfolio
                    </h1>
                    <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-center justify-center">
                        <button className="w-full sm:w-auto bg-[#0b6b3a] hover:bg-[#095c32] text-white font-bold px-7 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-green-900/20 text-base sm:text-lg">
                            📅 Book a Session
                        </button>
                        <button className="w-full sm:w-auto bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-bold px-7 py-4 rounded-full border border-gray-200 transition-all duration-200 hover:scale-105 shadow-md text-base sm:text-lg">
                            💼 Hire Me
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
