import React from 'react';
import { motion } from 'framer-motion';

export type ThermometerState = 'estable' | 'moderada' | 'severa' | 'critico';

interface ThermometerProps {
    state: ThermometerState;
    purchasingPowerLossPercent: number;
}

const getStateConfig = (state: ThermometerState) => {
    switch (state) {
        case 'estable':
            return {
                color: '#3BC371', // Green
                message: 'Tu dinero mantiene su valor.',
                height: '20%'
            };
        case 'moderada':
            return {
                color: '#9B66D9', // Purple
                message: 'Erosión moderada del poder adquisitivo.',
                height: '50%'
            };
        case 'severa':
            return {
                color: '#E18DC4', // Pink
                message: 'Pérdida severa de ingresos reales.',
                height: '80%'
            };
        case 'critico':
            return {
                color: '#FF3B3B', // Alert Red
                message: `¡ALERTA! La inflación está devorando tu sueldo.`,
                height: '100%'
            };
    }
};

export const Thermometer: React.FC<ThermometerProps> = ({ state, purchasingPowerLossPercent }) => {
    const config = getStateConfig(state);

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 w-full">
            <div className="relative w-16 h-64 bg-[#161616] border border-white/5 rounded-full flex items-end justify-center p-2 backdrop-blur-md overflow-hidden shadow-inner">
                {/* Glow de fondo */}
                <div
                    className="absolute inset-0 opacity-20 transition-opacity duration-1000"
                    style={{ backgroundColor: config.color }}
                />

                {/* Termómetro Líquido Animado */}
                <motion.div
                    className="w-full rounded-full flex items-center justify-center relative overflow-hidden"
                    initial={{ height: 0, backgroundColor: '#10b981' }}
                    animate={{ height: config.height, backgroundColor: config.color }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 1 }}
                    style={{
                        boxShadow: `0 0 20px ${config.color}`
                    }}
                >
                    {/* Burbujitas animadas (simulación) */}
                    <motion.div
                        className="absolute top-0 w-full h-2 bg-white/40 rounded-full"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </motion.div>
            </div>

            {/* Base redonda del termómetro */}
            <motion.div
                className="w-20 h-20 rounded-full border border-white/20 -mt-6 z-10 flex items-center justify-center backdrop-blur-xl relative"
                animate={{ backgroundColor: config.color }}
                transition={{ duration: 1 }}
                style={{ boxShadow: `0 0 30px ${config.color}` }}
            >
                <span className="text-white font-bold text-shadow text-lg">
                    {purchasingPowerLossPercent}%
                </span>
            </motion.div>

            <div className="mt-8 text-center max-w-[200px]">
                <motion.p
                    key={state}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white font-medium"
                >
                    {config.message}
                </motion.p>
            </div>
        </div>
    );
};
