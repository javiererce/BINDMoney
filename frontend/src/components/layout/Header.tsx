import React from 'react';
import { Activity } from 'lucide-react';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full glass-panel border-b-0 rounded-none border-x-0 !bg-[#0B0F1A]/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <Activity className="h-10 w-10 text-[var(--primary)] glow-primary transition-transform group-hover:scale-110" />
                    <span className="text-3xl md:text-4xl font-black tracking-tighter text-white">BIND<span className="text-[var(--primary)]">Money</span></span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#simulator" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Simulador</a>
                    <a href="#converter" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Horas de Vida</a>
                </nav>
            </div>
        </header>
    );
};
