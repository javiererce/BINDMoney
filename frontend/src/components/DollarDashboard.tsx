"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, Building2, Banknote, CreditCard, Coins, Landmark } from 'lucide-react';

interface DollarRate {
    casa: string;
    nombre: string;
    compra: number;
    venta: number;
    fechaActualizacion: string;
    variacion?: number;
    logo?: string;
}

const DollarCard = ({ rate, icon: Icon }: { rate: DollarRate; icon: any }) => {
    const isPositive = (rate.variacion || 0) >= 0;
    const lastUpdate = new Date(rate.fechaActualizacion);
    const timeAgo = Math.floor((new Date().getTime() - lastUpdate.getTime()) / (1000 * 60));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group relative"
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
            <div className="relative bg-[#0b111a] border border-white/5 rounded-2xl p-5 overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative p-2 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center w-12 h-12 overflow-hidden">
                            {rate.logo ? (
                                <img src={rate.logo} alt={rate.nombre} className="w-full h-full object-contain" />
                            ) : (
                                <Icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg leading-tight">{rate.nombre}</h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Clock className="h-3 w-3 text-gray-500" />
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                                    hace {timeAgo < 1 ? 'instantes' : `${timeAgo} min`}
                                </span>
                            </div>
                        </div>
                    </div>
                    {rate.variacion !== undefined && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {rate.variacion}%
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Vendé (Compra)</p>
                        <p className="text-2xl font-black text-white italic tabular-nums">
                            ${rate.compra.toLocaleString('es-AR')}
                        </p>
                    </div>
                    <div className="space-y-1 border-l border-white/5 pl-4">
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Comprá (Venta)</p>
                        <p className="text-2xl font-black text-emerald-400 italic tabular-nums glow-emerald-text">
                            ${rate.venta.toLocaleString('es-AR')}
                        </p>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] text-gray-600 uppercase font-bold tracking-tighter">Spread: ${(rate.venta - rate.compra).toFixed(2)}</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-1 h-3 bg-white/5 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const DollarDashboard = () => {
    const [rates, setRates] = useState<DollarRate[]>([]);
    const [loading, setLoading] = useState(true);

    const houseLogos: Record<string, string> = {
        'blue': 'https://raw.githubusercontent.com/fede-rodriguez/dolarbot/master/assets/dolar_blue.png',
        'bolsa': 'https://raw.githubusercontent.com/fede-rodriguez/dolarbot/master/assets/dolar_mep.png',
        'contadoconliqui': 'https://raw.githubusercontent.com/fede-rodriguez/dolarbot/master/assets/dolar_ccl.png',
        'buenbit': 'https://buenbit-assets.s3.us-east-1.amazonaws.com/87ba33cb.svg',
    };

    useEffect(() => {
        const fetchRates = async () => {
            try {
                // Fetch DolarAPI
                const resDolarApi = await fetch('https://dolarapi.com/v1/dolares');
                const dataDolarApi = await resDolarApi.json();

                // Fetch Buenbit (Ticker DAI/ARS as reference for Crypto Dollar)
                let buenbitRate: DollarRate | null = null;
                try {
                    const resBuenbit = await fetch('https://be.buenbit.com/api/market/tickers/');
                    const dataBuenbit = await resBuenbit.json();
                    const daiArs = dataBuenbit.object.daiars;
                    if (daiArs) {
                        buenbitRate = {
                            casa: 'buenbit',
                            nombre: 'Dólar Buenbit',
                            compra: parseFloat(daiArs.purchase_price),
                            venta: parseFloat(daiArs.selling_price),
                            fechaActualizacion: new Date().toISOString(),
                            logo: houseLogos['buenbit']
                        };
                    }
                } catch (e) {
                    console.error("Error fetching Buenbit:", e);
                }

                // Combinar y mapear logos
                let combinedRates: DollarRate[] = dataDolarApi.map((rate: any) => ({
                    ...rate,
                    logo: houseLogos[rate.casa] || null
                }));

                if (buenbitRate) {
                    combinedRates.push(buenbitRate);
                }

                // Priorizamos el orden
                const priorityOrder = ['blue', 'bolsa', 'contadoconliqui', 'buenbit', 'cripto', 'oficial', 'tarjeta'];
                combinedRates.sort((a, b) => {
                    const idxA = priorityOrder.indexOf(a.casa);
                    const idxB = priorityOrder.indexOf(b.casa);
                    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
                });

                setRates(combinedRates);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dollars:", error);
                setLoading(false);
            }
        };

        fetchRates();
        const interval = setInterval(fetchRates, 60000);
        return () => clearInterval(interval);
    }, []);

    const getIcon = (casa: string) => {
        switch (casa) {
            case 'oficial': return Landmark;
            case 'blue': return Banknote;
            case 'bolsa': return Building2;
            case 'contadoconliqui': return Coins;
            case 'tarjeta': return CreditCard;
            case 'cripto': return Coins;
            case 'buenbit': return Coins;
            default: return Banknote;
        }
    };

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-44 bg-white/5 rounded-2xl border border-white/5" />
            ))}
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img src="https://www.dolarito.ar/_next/static/media/logo_circular.ea6742b3.svg" alt="Dolarito" className="h-12 w-12 hidden md:block" />
                    <div>
                        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                            Mercado de Divisas <span className="text-[var(--primary)] text-shadow">Real-Time</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xl">
                            Cotizaciones integradas de <span className="text-white font-bold">Dolarito</span>, <span className="text-[var(--primary)] font-bold">Buenbit</span> y el mercado oficial.
                            Datos sincronizados minuto a minuto.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full self-start md:self-end">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Conexión Live</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rates.map(rate => (
                    <DollarCard key={rate.casa} rate={rate} icon={getIcon(rate.casa)} />
                ))}
            </div>
        </div>
    );
};
