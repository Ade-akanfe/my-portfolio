"use client";

import { useState } from "react";
import { FiMail, FiMessageSquare, FiSend, FiGithub, FiLinkedin, FiTwitter, FiPhone, FiCheckCircle, FiLoader } from "react-icons/fi";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", message: "" });
                // Reset to idle after 5 seconds to allow another message
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="relative w-full py-24 md:py-12 bg-[#fcf8ef] overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-green-50/50 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-5%] right-[-10%] w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left side - Info */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#0b6b3a]">Get in touch</p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 tracking-tight leading-tight">
                                Let&apos;s build something<br />
                                <span className="italic text-[#0b6b3a]">extraordinary</span>
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                                Have a project in mind or just want to say hi? I&apos;m always open to discussing new opportunities and creative ideas.
                            </p>
                        </div>

                        <div className="grid gap-8">
                            {[
                                { icon: FiMail, label: "Email", value: "adeakanfea@gmail.com", link: "mailto:adeakanfea@gmail.com" },
                                { icon: FiPhone, label: "Phone & WhatsApp", value: "+234 8105535967", link: "https://wa.me/2348105535967" },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.link}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center transition-all group-hover:bg-[#0b6b3a] group-hover:text-white group-hover:scale-110">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-xl font-bold text-gray-800">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="space-y-6 pt-6">
                            <p className="text-sm font-bold text-gray-800">Follow the progress</p>
                            <div className="flex gap-4">
                                {[
                                    { Icon: FiGithub, link: "https://github.com/Ade-akanfe" },
                                    { Icon: FiLinkedin, link: "https://ng.linkedin.com/in/ademola-ade-akanfe" },
                                    { Icon: FiTwitter, link: "https://twitter.com/devdemola" },
                                ].map((social, i) => (
                                    <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#0b6b3a] hover:border-[#0b6b3a] hover:scale-110 transition-all shadow-sm">
                                        <social.Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(11,107,58,0.1)] border border-gray-50 relative overflow-hidden group">
                        {/* Decorative gradient corner */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-[#0b6b3a]/10 to-transparent rounded-bl-[40px] pointer-events-none" />

                        {status === "success" ? (
                            <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-6 py-12 text-center animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#0b6b3a]">
                                    <FiCheckCircle className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-gray-800">Message Sent!</h3>
                                    <p className="text-gray-500 max-w-[240px]">Thank you for reaching out. I&apos;ll get back to you as soon as possible! 🚀</p>
                                </div>
                            </div>
                        ) : (
                            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-800 uppercase tracking-wider ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-[#0b6b3a]/20 transition-all outline-hidden font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-800 uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-[#0b6b3a]/20 transition-all outline-hidden font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-800 uppercase tracking-wider ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+234 ..."
                                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-[#0b6b3a]/20 transition-all outline-hidden font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-800 uppercase tracking-wider ml-1">Your Message</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-[#0b6b3a]/20 transition-all outline-hidden font-medium resize-none"
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-red-500 text-sm font-bold ml-1">Something went wrong. Please try again.</p>
                                )}

                                <button 
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full bg-[#0b6b3a] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#074d29] transition-all hover:scale-[1.02] shadow-xl shadow-green-900/20 group/btn disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                                >
                                    {status === "sending" ? (
                                        <>
                                            <FiLoader className="w-5 h-5 animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <FiSend className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
