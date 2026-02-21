"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Thermometer, ThermometerState } from './Thermometer';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator } from 'lucide-react';

export const InflationSimulator = () => {
    const [income, setIncome] = useState<number>(1000000);
    const [fixedExpenses, setFixedExpenses] = useState<number>(400000);
    const [variableExpenses, setVariableExpenses] = useState<number>(300000);
    const [inflationRate, setInflationRate] = useState<number>(120);

    const [projections, setProjections] = useState<any[]>([]);
    const [currentLoss, setCurrentLoss] = useState<number>(0);
    const [lossPercent, setLossPercent] = useState<number>(0);
    const [thermoState, setThermoState] = useState<ThermometerState>('estable');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch official inflation from INDEC (via api/inflation)
        fetch('/api/inflation')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.annualRate) {
                    setInflationRate(data.annualRate);
                }
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        // Math Logic for Instant 60fps UI Response
        const monthlyInflation = Math.pow(1 + (inflationRate / 100), 1 / 12) - 1;

        const newProjections = [0, 6, 12, 18, 24].map(months => {
            const realIncome = income / Math.pow(1 + monthlyInflation, months);
            const nominalExpenses = (fixedExpenses + variableExpenses) * Math.pow(1 + monthlyInflation, months);

            return {
                month: months === 0 ? 'Hoy' : `Mes ${months}`,
                ingresoReal: Math.round(realIncome),
                gastosNominales: Math.round(nominalExpenses),
            };
        });

        const currentMonthlyLoss = income - (income / (1 + monthlyInflation));
        const percentLoss = (currentMonthlyLoss / income) * 100;

        setProjections(newProjections);
        setCurrentLoss(Math.round(currentMonthlyLoss));
        setLossPercent(Number(percentLoss.toFixed(1)));

        // Set Thermometer State
        if (percentLoss < 2) setThermoState('estable');
        else if (percentLoss < 5) setThermoState('moderada');
        else if (percentLoss < 10) setThermoState('severa');
        else setThermoState('critico');

    }, [income, fixedExpenses, variableExpenses, inflationRate]);

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Panel de Inputs */}
            <Card className="lg:col-span-1 space-y-6 bg-black/40">
                <div className="flex items-center gap-3 mb-6">
                    <Calculator className="text-[var(--primary)] h-6 w-6" />
                    <h3 className="text-xl font-bold text-white">Tus Datos</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Ingreso Mensual (ARS)</label>
                        <input
                            type="number"
                            value={income || ''}
                            onChange={(e) => setIncome(e.target.value === '' ? 0 : Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Gastos Fijos (ARS)</label>
                        <input
                            type="number"
                            value={fixedExpenses || ''}
                            onChange={(e) => setFixedExpenses(e.target.value === '' ? 0 : Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Gastos Variables (ARS)</label>
                        <input
                            type="number"
                            value={variableExpenses || ''}
                            onChange={(e) => setVariableExpenses(e.target.value === '' ? 0 : Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="flex justify-between text-sm font-medium text-gray-400 mb-3">
                            <span>Inflación Anual Estimada</span>
                            <div className="flex flex-col items-end">
                                <span className="text-[var(--accent)] font-bold text-lg">{inflationRate}%</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Dato Oficial INDEC</span>
                            </div>
                        </label>
                        <div className="p-3 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl text-xs text-gray-400 leading-relaxed italic">
                            El valor de inflación se ha fijado según el último reporte oficial del INDEC para garantizar proyecciones precisas.
                        </div>
                    </div>
                </div>
            </Card>

            {/* Resultados y Gráfico */}
            <Card className="lg:col-span-2 flex flex-col">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Termómetro */}
                    <div className="flex items-center justify-center p-4 bg-black/20 rounded-2xl border border-white/5 relative h-64 overflow-hidden">
                        <Thermometer state={thermoState} purchasingPowerLossPercent={lossPercent} />
                    </div>

                    {/* Resumen */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Pérdida mensual en pesos reales</p>
                            <p className="text-4xl font-black text-[var(--accent)] glow-accent-text">
                                -${currentLoss.toLocaleString('es-AR')}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Pérdida anual proyectada</p>
                            <p className="text-3xl font-bold text-white">
                                -${(currentLoss * 12).toLocaleString('es-AR')}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                            <p className="text-[var(--foreground)] text-sm">
                                Tu poder adquisitivo se reduce un <span className="text-[var(--accent)] font-bold">{lossPercent}%</span> cada mes si tus ingresos no acompañan la inflación.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Gráfico */}
                <div className="h-64 mt-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={projections} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorIngreso" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorGasto" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0B0F1A', borderColor: '#ffffff20', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value: any) => `$${Number(value).toLocaleString('es-AR')}`}
                            />
                            <Area type="monotone" dataKey="ingresoReal" name="Poder Adquisitivo Real" stroke="var(--primary)" fillOpacity={1} fill="url(#colorIngreso)" strokeWidth={3} />
                            <Area type="monotone" dataKey="gastosNominales" name="Gastos Nominales Proyectados" stroke="var(--accent)" fillOpacity={1} fill="url(#colorGasto)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};
