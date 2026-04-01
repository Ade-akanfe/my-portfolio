"use client";

import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiArrowUp, FiMail } from "react-icons/fi";

const SOCIAL_LINKS = [
  { name: "GitHub", icon: <FiGithub />, href: "https://github.com/Ade-akanfe" },
  { name: "LinkedIn", icon: <FiLinkedin />, href: "https://ng.linkedin.com/in/ademola-ade-akanfe" },
  { name: "Twitter", icon: <FiTwitter />, href: "https://twitter.com/devdemola" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-white pt-24 pb-12 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand/About */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">DEMO</h3>
              <p className="text-gray-500 text-lg max-w-sm font-medium leading-relaxed">
                Crafting premium digital experiences through deep engineering and thoughtful design.
              </p>
            </div>
            <a href="mailto:adeakanfea@gmail.com" className="inline-flex items-center gap-3 text-[#0b6b3a] font-bold hover:underline">
              <FiMail />
              <span>adeakanfea@gmail.com</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Sitemap</h4>
            <div className="flex flex-col gap-4">
              {["About", "Projects", "Support"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-800 font-bold hover:text-[#0b6b3a] transition-colors text-base">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Social Presence */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#0b6b3a]/10 hover:text-[#0b6b3a] transition-all text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-gray-50 gap-8">
          <p className="text-gray-400 text-sm font-bold tracking-wide">
            &copy; {new Date().getFullYear()} Demo. Built with Next.js & Caffeine.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs font-black text-gray-500 hover:text-[#0b6b3a] transition-all uppercase tracking-widest"
          >
            <span>Back to Top</span>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-50 group-hover:border-transparent transition-all">
              <FiArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
