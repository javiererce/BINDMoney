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
            <Card className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="text-[var(--secondary)] h-6 w-6" />
                    <h3 className="text-xl font-bold text-white">Tus Ingresos</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Sueldo Mensual (ARS)</label>
                        <input
                            type="number"
                            value={income || ''}
                            onChange={(e) => setIncome(e.target.value === '' ? 0 : Number(e.target.value))}
                            placeholder="Ej: 1000000"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--secondary)] transition-colors appearance-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Horas Trabajadas (Semana)</label>
                        <input
                            type="number"
                            value={weeklyHours || ''}
                            onChange={(e) => setWeeklyHours(e.target.value === '' ? 0 : Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--secondary)] transition-colors appearance-none"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Tu valor hora estimado: <span className="text-[var(--secondary)] font-bold">${hourlyRate.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </p>
                    </div>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <div className="flex items-center gap-3 mb-6">
                    <ShoppingBag className="text-[var(--accent)] h-6 w-6" />
                    <h3 className="text-xl font-bold text-white">Simular Compra</h3>
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                        <span>¿Cuánto cuesta lo que querés comprar?</span>
                        <span className="text-gray-300 font-bold">
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
                        className={`w-full bg-white/5 border-2 border-[var(--secondary)]/30 rounded-lg px-4 py-4 text-white font-bold text-xl focus:outline-none focus:border-[var(--secondary)] transition-colors appearance-none ${selectedInvest.id !== 'fci' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {selectedInvest.id !== 'fci' && (
                        <p className="text-xs text-[var(--secondary)] mt-2 italic">
                            El valor de la compra se bloqueó y se ajustó automáticamente al precio de 1 {selectedInvest.name}.
                        </p>
                    )}
                </div>

                {/* Resultados Visuales Integrados (Movidos aquí por petición del usuario) */}
                <div className="mt-8 p-6 bg-black/20 rounded-2xl border border-[var(--secondary)]/20 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--secondary)]/5 rounded-full blur-3xl -z-10" />

                    <div className="flex flex-col items-center justify-center space-y-4">
                        <Clock className="h-12 w-12 text-[var(--secondary)] mb-2 glow-secondary" />
                        <h4 className="text-xl font-bold text-white">Esta compra equivale a</h4>

                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={hoursNeeded}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)]"
                            >
                                {hoursNeeded.toFixed(1)} <span className="text-2xl">horas</span>
                            </motion.div>
                        </AnimatePresence>
                        <p className="text-gray-400 text-sm">de tu vida trabajando.</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                            <p className="text-xs text-gray-400 mb-1">Días Laborales</p>
                            <p className="text-xl font-bold text-white">{daysNeeded.toFixed(1)} días</p>
                        </div>
                        <div className="bg-black/40 rounded-xl p-3 border border-[var(--accent)]/20">
                            <p className="text-xs text-[var(--accent)] mb-1">Impacto Mensual</p>
                            <p className="text-xl font-bold text-white">{incomePercent.toFixed(1)}%</p>
                        </div>
                    </div>
                </div>

                {/* Selector de Instrumento de Inversión */}
                <div className="w-full mt-6 bg-black/40 border border-white/5 rounded-xl p-4 shadow-lg text-left relative overflow-hidden">
                    <p className="text-gray-400 font-bold text-sm mb-3">Calculadora de Costo de Oportunidad</p>
                    <div className="flex gap-2 mb-4">
                        {investmentOptions.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setSelectedInvest(opt)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedInvest.id === opt.id
                                    ? 'bg-white text-black'
                                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                    }`}
                            >
                                {opt.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4 items-start border rounded-xl p-3" style={{ borderColor: `${selectedInvest.color}30`, backgroundColor: `${selectedInvest.color}10` }}>
                        <TrendingUp className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: selectedInvest.color }} />
                        <div>
                            <p className="font-bold text-sm mb-1" style={{ color: selectedInvest.color }}>
                                Si invertías en {selectedInvest.name}
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                En lugar de gastar, invertidos en 12 meses tendrías <span style={{ color: selectedInvest.color }} className="font-bold text-lg">${Math.round(opportunityCost).toLocaleString('es-AR')}</span>. <br />
                                <span className="text-xs text-white/60">{selectedInvest.desc}</span>
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
