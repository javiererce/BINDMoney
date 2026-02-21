"use client";

import React from 'react';
import { Activity } from 'lucide-react';

export const Header = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0E0E0E]/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div
                    onClick={scrollToTop}
                    className="flex items-center gap-3 group cursor-pointer"
                >
                    <Activity className="h-10 w-10 text-[var(--primary)] glow-primary transition-transform group-hover:scale-110" />
                    <span className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase italic">
                        BIND<span className="text-[var(--primary)]">Money</span>
                    </span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#simulator" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Simulador</a>
                    <a href="#converter" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Horas de Vida</a>
                </nav>
            </div>
        </header>
    );
};
