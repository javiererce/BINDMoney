import React from 'react';

export const Footer = () => {
    return (
        <footer className="w-full glass-panel border-b-0 rounded-none border-x-0 mt-20 py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-10">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Invertí tus ahorros con los mejores brokers</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                        <a href="https://inversiones.bind.com.ar/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="h-16 w-40 bg-white rounded-xl p-2 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-black/20">
                                <img src="/logos/bind_inversiones.jpg" alt="BIND Inversiones" className="h-full w-full object-contain" />
                            </div>
                        </a>
                        <a href="https://cocos.capital/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="h-16 w-40 bg-white rounded-xl p-2 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-black/20">
                                <img src="/logos/cocos.png" alt="Cocos Capital" className="h-full w-full object-contain" />
                            </div>
                        </a>
                        <a href="https://www.invertironline.com/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="h-16 w-40 bg-white rounded-xl p-2 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-black/20">
                                <img src="/logos/iol.png" alt="IOL Invertironline" className="h-full w-full object-contain" />
                            </div>
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
