import React from 'react';
import { Card } from '@/components/ui/Card';
import { ArrowRight, TrendingDown, Clock, ShieldAlert, Coins } from 'lucide-react';
import { InflationSimulator } from '@/components/InflationSimulator';
import { LifeHoursConverter } from '@/components/LifeHoursConverter';
import { DollarDashboard } from '@/components/DollarDashboard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-16 pt-8 md:pt-16">
        <div className="flex justify-center mb-8">
          <img src="https://buenbit-assets.s3.us-east-1.amazonaws.com/87ba33cb.svg" alt="Buenbit" className="h-12 w-auto animate-pulse" />
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white leading-[0.9] italic uppercase">
          Tu dinero <br />
          <span className="text-[var(--primary)]">Se evapora.</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-500 mb-10 font-bold uppercase tracking-[0.3em] px-2 opacity-80">
          Calculá el impacto real de la inflación y el <span className="text-white">Costo de Vida</span>.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#simulator" className="group bg-[var(--primary)] text-black px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[var(--primary)]/20">
            Simular Inflación
          </a>
          <a href="#converter" className="group bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:bg-white/10">
            Horas de Vida
          </a>
          <a href="#dollars" className="group bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:bg-white/10">
            Cotizaciones
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <Card className="bg-[#161616] border-white/5 p-8 rounded-[2.5rem]">
          <div className="h-14 w-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8">
            <TrendingDown className="text-[var(--primary)] h-7 w-7" />
          </div>
          <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">Impacto Real</h3>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">Proyectá la pérdida de poder adquisitivo con datos oficiales del INDEC.</p>
        </Card>

        <Card className="bg-[#161616] border-white/5 p-8 rounded-[2.5rem]">
          <div className="h-14 w-14 rounded-2xl bg-[var(--secondary)]/10 flex items-center justify-center mb-8">
            <Clock className="text-[var(--secondary)] h-7 w-7" />
          </div>
          <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">Costo en Tiempo</h3>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">Convertí cualquier compra a horas reales de trabajo según tu sueldo.</p>
        </Card>

        <Card className="bg-[#161616] border-white/5 p-8 rounded-[2.5rem]">
          <div className="h-14 w-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-8">
            <ShieldAlert className="text-[var(--accent)] h-7 w-7" />
          </div>
          <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">Decisiones</h3>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">Generá consciencia financiera antes de realizar gastos hormiga.</p>
        </Card>
      </section>

      {/* Simulators Integration */}
      <section id="simulator" className="mb-32 pt-16">
        <h2 className="text-2xl font-black text-center mb-12 text-white italic tracking-[0.3em] uppercase opacity-50">
          Simulador de <span className="text-[var(--primary)] opacity-100">Inflación</span>
        </h2>
        <InflationSimulator />
      </section>

      <section id="converter" className="mb-32 pt-16">
        <h2 className="text-2xl font-black text-center mb-12 text-white italic tracking-[0.3em] uppercase opacity-50">
          Conversor a <span className="text-[var(--secondary)] opacity-100">Horas de Vida</span>
        </h2>
        <LifeHoursConverter />
      </section>

      <section id="dollars" className="mb-32 pt-16">
        <DollarDashboard />
      </section>
    </div>
  );
}
