"use client";

import { useState, useEffect, Suspense } from "react";
import { FiMonitor, FiHeart, FiCoffee, FiZap, FiCheckCircle, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

const TIERS = [
    { amount: 5, label: "Expresso Shot", icon: <FiZap />, detail: "A quick boost to keep the code running." },
    { amount: 15, label: "Double Latte", icon: <FiCoffee />, detail: "Fuels a night of feature building.", best: true },
    { amount: 50, label: "Coffee Beans", icon: <FiHeart />, detail: "Supporting a long-term growth mission." },
];

function BuyMeCoffeeContent() {
    const searchParams = useSearchParams();
    const [selectedTier, setSelectedTier] = useState<number | null>(15);
    const [loading, setLoading] = useState(false);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (searchParams?.get("success") === "true") {
            setIsSuccess(true);
            const el = document.getElementById("support");
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 500);
            }
        }
    }, [searchParams]);

    const handleCheckout = async () => {
        setLoading(true);
        const amount = customAmount ? parseFloat(customAmount) : selectedTier;

        if (!amount || amount <= 0) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error("Checkout error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="support" className="relative w-full py-18 md:py-20 bg-[#fcf8ef] overflow-hidden">
            {/* Background Grain/Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="max-w-2xl mx-auto space-y-8 bg-white p-12 md:p-20 rounded-[48px] shadow-3xl border border-green-50"
                        >
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-[#0b6b3a] mx-auto relative">
                                <FiCheckCircle className="w-12 h-12" />
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-green-200 rounded-full"
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-4xl font-black text-gray-800 tracking-tight">Fuel Received! ☕</h3>
                                <p className="text-gray-500 text-xl font-medium leading-relaxed">
                                    Your support means the world to me. Thanks to you, the caffeine is flowing and the code is shipping!
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="text-[#0b6b3a] font-black uppercase tracking-widest text-sm hover:underline"
                            >
                                Send another coffee?
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="max-w-3xl mx-auto space-y-6 mb-16">
                                <p className="text-xs uppercase tracking-[0.4em] font-black text-[#0b6b3a]">Support the work</p>
                                <h2 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tight leading-tight">
                                    Power my next <br />
                                    <span className="italic text-[#0b6b3a]">cup of coffee</span>
                                </h2>
                                <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
                                    If you found my projects helpful, consider fueling my creative caffeine addiction. Every sip translates to more open-source code.
                                </p>
                            </div>

                            {/* Donation Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {TIERS.map((tier) => (
                                    <div
                                        key={tier.amount}
                                        onClick={() => { setSelectedTier(tier.amount); setCustomAmount(""); }}
                                        className={`group relative p-8 rounded-[32px] border-2 cursor-pointer transition-all duration-500 hover:scale-[1.02] ${selectedTier === tier.amount && !customAmount
                                                ? "bg-white border-[#0b6b3a] shadow-2xl shadow-[#0b6b3a]/10"
                                                : "bg-white/40 border-transparent hover:border-gray-200"
                                            }`}
                                    >
                                        {tier.best && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0b6b3a] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 transition-all duration-500 ${selectedTier === tier.amount && !customAmount ? "bg-[#0b6b3a] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                            }`}>
                                            {tier.icon}
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800 mb-2">${tier.amount}</h3>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{tier.label}</p>
                                        <p className="text-gray-500 font-medium text-sm leading-relaxed">{tier.detail}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Custom Amount & CTA */}
                            <div className="mt-12 max-w-xl mx-auto space-y-8">
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="Or Enter custom amount ($)"
                                        value={customAmount}
                                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedTier(null); }}
                                        className="w-full bg-white border border-gray-100 rounded-3xl px-8 py-5 text-lg font-bold text-gray-800 placeholder:text-gray-300 focus:outline-hidden focus:ring-4 focus:ring-[#0b6b3a]/5 transition-all shadow-xl shadow-gray-200/50"
                                    />
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="group w-full relative bg-[#0b6b3a] text-white font-black text-xl py-6 rounded-3xl shadow-2xl shadow-[#0b6b3a]/20 overflow-hidden transform hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {loading ? (
                                            "Preparing Caffeine..."
                                        ) : (
                                            <>
                                                <span>Support with ${customAmount || selectedTier}</span>
                                                <FiCheckCircle className="w-6 h-6 transform translate-y-10 group-hover:translate-y-0 transition-all opacity-0 group-hover:opacity-100" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                                </button>

                                <div className="flex items-center justify-center gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest pt-4">
                                    <span className="flex items-center gap-2"><FiMonitor className="w-4 h-4" /> Secure Stripe Checkout</span>
                                    <span className="flex items-center gap-2"><FiHeart className="w-4 h-4" /> Powered by Gratitude</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export default function BuyMeCoffee() {
    return (
        <Suspense fallback={<div>Loading support...</div>}>
            <BuyMeCoffeeContent />
        </Suspense>
    );
}
