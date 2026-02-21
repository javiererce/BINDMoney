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
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-lg leading-tight">
          Tu dinero se evapora. <br />
          <span className="text-[var(--primary)] glow-primary-text">Tu tiempo no vuelve.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 font-light px-2">
          Calcula el impacto real de la inflación en tus ingresos y descubre cuántas horas de tu vida requiere cada compra.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#simulator" className="group glass-panel !bg-[var(--primary)]/20 hover:!bg-[var(--primary)]/30 border-[var(--primary)]/50 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all glow-primary">
            Simular Inflación
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#converter" className="group glass-panel hover:!bg-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
            Calcular Horas de Vida
            <Clock className="h-5 w-5" />
          </a>
          <a href="#dollars" className="group glass-panel hover:!bg-[var(--accent)]/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
            Cotizaciones Live
            <Coins className="h-5 w-5 text-[var(--accent)]" />
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <Card>
          <div className="h-12 w-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mb-6">
            <TrendingDown className="text-[var(--primary)]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Impacto Real</h3>
          <p className="text-gray-400">Proyecta la pérdida de poder adquisitivo a 6, 12 y 24 meses con datos reales.</p>
        </Card>

        <Card glow="secondary">
          <div className="h-12 w-12 rounded-full bg-[var(--secondary)]/20 flex items-center justify-center mb-6">
            <Clock className="text-[var(--secondary)]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Costo en Tiempo</h3>
          <p className="text-gray-400">Convierte el precio de cualquier producto a horas y días reales de trabajo según tu sueldo.</p>
        </Card>

        <Card glow="accent">
          <div className="h-12 w-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-6">
            <ShieldAlert className="text-[var(--accent)]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Decisiones Inteligentes</h3>
          <p className="text-gray-400">Genera consciencia financiera antes de hacer gastos innecesarios o no presupuestados.</p>
        </Card>
      </section>

      {/* Simulators Integration */}
      <section id="converter" className="mb-32 pt-16">
        <h2 className="text-4xl font-black text-center mb-12 text-white italic tracking-tighter uppercase">
          Conversor a <span className="text-[var(--secondary)]">Horas de Vida</span>
        </h2>
        <LifeHoursConverter />
      </section>

      <section id="dollars" className="mb-32 pt-16">
        <DollarDashboard />
      </section>
    </div>
  );
}
