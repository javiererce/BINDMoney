import React from 'react';

export const Footer = () => {
    return (
        <footer className="w-full glass-panel border-b-0 rounded-none border-x-0 mt-20 py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-10">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Invertí tus ahorros con los mejores brokers</p>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 items-center opacity-70 hover:opacity-100 transition-opacity">
                        <a href="https://inversiones.bind.com.ar/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                            <div className="h-12 w-32 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all font-bold text-white">IVSA</div>
                            <span className="text-[10px] text-gray-500 font-medium">INDUSTRIAL VALORES</span>
                        </a>
                        <a href="https://cocos.capital/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                            <div className="h-12 w-32 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all font-bold text-[#00ff94]">COCOS</div>
                            <span className="text-[10px] text-gray-500 font-medium">CAPITAL</span>
                        </a>
                        <a href="https://www.invertironline.com/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                            <div className="h-12 w-32 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all font-bold text-[#ffcd00]">IOL</div>
                            <span className="text-[10px] text-gray-500 font-medium">INVERTIRONLINE</span>
                        </a>
                    </div>
                </div>
                <p className="text-gray-500 text-[10px] mt-8 max-w-xl mx-auto italic">
                    BINDMoney es una herramienta educativa. No constituye asesoramiento financiero ni recomendación de inversión. Las cotizaciones son informativas.
                </p>
            </div>
        </footer>
    );
};
