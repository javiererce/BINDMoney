"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Clock, Briefcase, ShoppingBag, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LifeHoursConverter = () => {
    const [income, setIncome] = useState<number>(1000000);
    const [weeklyHours, setWeeklyHours] = useState<number>(40);
    const [purchaseAmount, setPurchaseAmount] = useState<number>(150000); // Ej: Zapatillas

    const [hourlyRate, setHourlyRate] = useState<number>(0);
    const [dailyRate, setDailyRate] = useState<number>(0);
    const [hoursNeeded, setHoursNeeded] = useState<number>(0);
    const [daysNeeded, setDaysNeeded] = useState<number>(0);
    const [incomePercent, setIncomePercent] = useState<number>(0);

    const [stockPrices, setStockPrices] = useState({ YPFD: 0, GGAL: 0 });

    // Opciones de inversión estáticas y dinámicas
    const investmentOptions = [
        { id: 'fci', name: 'FCI Liquidez', rate: 0.014, color: '#10b981', desc: 'Rendimiento conservador estimado ~1.4% mensual (18.4% TEA).' },
        { id: 'galicia', name: 'Acciones GGAL', rate: 0.12, color: '#f59e0b', desc: `Crecimiento histórico ~12% mensual promedio (Alto Riesgo). Precio actual: $${stockPrices.GGAL > 0 ? stockPrices.GGAL : '...'}` },
        { id: 'ypf', name: 'Acciones YPFD', rate: 0.08, color: '#3b82f6', desc: `Recuperación histórica ~8% mensual promedio (Alto Riesgo). Precio actual: $${stockPrices.YPFD > 0 ? stockPrices.YPFD : '...'}` }
    ];

    const [selectedInvest, setSelectedInvest] = useState(investmentOptions[0]);
    const [opportunityCost, setOpportunityCost] = useState<number>(0);

    useEffect(() => {
        // Fetch real-time prices
        fetch('/api/stocks')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.prices) {
                    setStockPrices({
                        YPFD: data.prices.YPFD || 0,
                        GGAL: data.prices.GGAL || 0
                    });
                }
            })
            .catch(console.error);
    }, []);

    // Sincronizar selección actual cuando cambian los precios
    useEffect(() => {
        setSelectedInvest(prev => investmentOptions.find(o => o.id === prev.id) || investmentOptions[0]);
    }, [stockPrices, investmentOptions]); // Added investmentOptions to dependency array as it now depends on stockPrices

    useEffect(() => {
        // Calculos
        const monthlyHours = weeklyHours * 4.33; // Promedio de semanas en un mes
        const currentHourly = income / monthlyHours;
        const hoursPerDay = weeklyHours / 5; // Asumiendo 5 días 
        const currentDaily = currentHourly * hoursPerDay;

        // Determinar si usamos el input del usuario o el precio de la acción
        let targetAmount = purchaseAmount;
        let isStock = false;
        if (selectedInvest.id === 'ypf' && stockPrices.YPFD > 0) {
            targetAmount = stockPrices.YPFD;
            isStock = true;
        } else if (selectedInvest.id === 'galicia' && stockPrices.GGAL > 0) {
            targetAmount = stockPrices.GGAL;
            isStock = true;
        }

        const neededHrs = targetAmount / currentHourly;
        const neededDays = neededHrs / hoursPerDay;
        const percent = (targetAmount / income) * 100;

        // Costo oportunidad dinámico basado en la selección (proyección a 12 meses)
        const futureValue = targetAmount * Math.pow(1 + selectedInvest.rate, 12);

        setHourlyRate(currentHourly);
        setDailyRate(currentDaily);
        setHoursNeeded(neededHrs);
        setDaysNeeded(neededDays);
        setIncomePercent(percent);
        setOpportunityCost(futureValue);
    }, [income, weeklyHours, purchaseAmount, selectedInvest]);

    return (
        <div className="max-w-3xl mx-auto">
            {/* Inputs */}
            <Card className="space-y-6 bg-[#161616] border-white/5">
                <div className="flex items-center gap-3 mb-6 font-serif">
                    <div className="p-2 bg-[var(--secondary)]/10 rounded-xl">
                        <Briefcase className="text-[var(--secondary)] h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Tus Ingresos</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Sueldo Mensual (ARS)</label>
                        <input
                            type="number"
                            value={income || ''}
                            onChange={(e) => setIncome(e.target.value === '' ? 0 : Number(e.target.value))}
                            placeholder="Ej: 1000000"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[var(--secondary)] transition-all font-medium text-lg appearance-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Horas Trabajadas (Semana)</label>
                        <input
                            type="number"
                            value={weeklyHours || ''}
                            onChange={(e) => setWeeklyHours(e.target.value === '' ? 0 : Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[var(--secondary)] transition-all font-medium text-lg appearance-none"
                        />
                        <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest font-black">
                            Tu valor hora estimado: <span className="text-[var(--secondary)]">${hourlyRate.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </p>
                    </div>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <div className="flex items-center gap-3 mb-6">
                    <ShoppingBag className="text-[var(--accent)] h-6 w-6" />
                    <h3 className="text-xl font-bold text-white">Simular Compra</h3>
                </div>

                <div>
                    <label className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        <span>¿Cuánto cuesta lo que querés comprar?</span>
                        <span className="text-[var(--primary)]">
                            ${(selectedInvest.id === 'ypf' && stockPrices.YPFD > 0)
                                ? stockPrices.YPFD.toLocaleString('es-AR')
                                : (selectedInvest.id === 'galicia' && stockPrices.GGAL > 0)
                                    ? stockPrices.GGAL.toLocaleString('es-AR')
                                    : purchaseAmount.toLocaleString('es-AR')}
                        </span>
                    </label>
                    <input
                        type="number"
                        value={purchaseAmount || ''}
                        disabled={selectedInvest.id !== 'fci'}
                        onChange={(e) => setPurchaseAmount(e.target.value === '' ? 0 : Number(e.target.value))}
                        placeholder="Ej: 150000"
                        className={`w-full bg-white/5 border-2 border-[var(--primary)]/20 rounded-2xl px-5 py-5 text-white font-black text-2xl focus:outline-none focus:border-[var(--primary)] transition-all appearance-none ${selectedInvest.id !== 'fci' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {selectedInvest.id !== 'fci' && (
                        <p className="text-[10px] text-[var(--primary)] mt-2 italic font-bold uppercase">
                            Precio ajustado a 1 {selectedInvest.name}.
                        </p>
                    )}
                </div>

                {/* Resultados Visuales Integrados (Movidos aquí por petición del usuario) */}
                <div className="mt-8 p-8 bg-[#0E0E0E] rounded-[2.5rem] border border-white/5 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--primary)]/5 rounded-full blur-3xl -z-10" />

                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-[var(--primary)]/10 rounded-full mb-2">
                            <Clock className="h-10 w-10 text-[var(--primary)]" />
                        </div>
                        <h4 className="text-xl font-bold text-white tracking-tight uppercase">Equivale a</h4>

                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={hoursNeeded}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-6xl md:text-7xl font-black text-white italic tabular-nums"
                            >
                                {hoursNeeded.toFixed(1)} <span className="text-2xl not-italic text-gray-500">horas</span>
                            </motion.div>
                        </AnimatePresence>
                        <p className="text-gray-600 text-[10px] uppercase font-black tracking-[0.2em]">de tu vida trabajando</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 mt-10">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Días Laborales</p>
                            <p className="text-2xl font-black text-white italic tabular-nums">{daysNeeded.toFixed(1)}</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-[var(--accent)]/10">
                            <p className="text-[10px] text-[var(--accent)] uppercase font-black tracking-widest mb-1">Impacto</p>
                            <p className="text-2xl font-black text-white italic tabular-nums">{incomePercent.toFixed(1)}%</p>
                        </div>
                    </div>
                </div>

                {/* Selector de Instrumento de Inversión */}
                <div className="w-full mt-6 bg-[#0E0E0E] border border-white/5 rounded-[2rem] p-6 shadow-lg text-left relative overflow-hidden">
                    <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 text-center">Costo de Oportunidad</p>
                    <div className="flex gap-2 mb-6 justify-center">
                        {investmentOptions.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setSelectedInvest(opt)}
                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedInvest.id === opt.id
                                    ? 'bg-[var(--primary)] text-black'
                                    : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {opt.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4 items-start border-white/5 border rounded-[1.5rem] p-5 bg-white/[0.02]">
                        <div className="p-3 rounded-2xl bg-white/5">
                            <TrendingUp className="h-6 w-6 flex-shrink-0" style={{ color: selectedInvest.color }} />
                        </div>
                        <div>
                            <p className="font-bold text-xs uppercase tracking-widest mb-1" style={{ color: selectedInvest.color }}>
                                Proyección a 12 Meses
                            </p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                En lugar de gastar hoy, si invertís tu capital podrías tener <span className="text-white font-black text-xl italic tabular-nums ml-1">${Math.round(opportunityCost).toLocaleString('es-AR')}</span>. <br />
                                <span className="text-[10px] text-gray-600 uppercase font-bold tracking-tighter mt-1 block">{selectedInvest.desc}</span>
                            </p>
                        </div>
                    </div>

                    {/* Publicidad de IVSA / BIND */}
                    <div className="mt-4 pt-3 border-t border-white/10 text-center text-xs text-gray-400 flex flex-col items-center">
                        <span>Cotizaciones online provistas para fines educativos.</span>
                        <a
                            href="https://inversiones.bind.com.ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-white font-bold hover:text-[var(--primary)] transition-colors inline-flex items-center gap-1"
                        >
                            Operá estos instrumentos en <span className="text-[var(--primary)] text-shadow">IVSA (Industrial Valores)</span> y potenciá tus ahorros →
                        </a>
                    </div>
                </div>

                <p className="mt-8 text-white/70 italic text-sm">
                    "¿Realmente vale la pena gastar {daysNeeded.toFixed(1)} días de tu tiempo por esto?"
                </p>
            </Card>

            {/* Eliminado el segundo card lateral para un flujo vertical más limpio solicitado */}
        </div>
    );
};
