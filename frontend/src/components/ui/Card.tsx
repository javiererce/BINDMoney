import React from 'react';
import { cn } from '@/lib/utils'; // Necesitaremos esta utilidad, la crearé pronto

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    glow?: 'primary' | 'secondary' | 'accent' | 'none';
}

export const Card = ({ children, className, glow = 'none', ...props }: CardProps) => {
    const glowClass = glow !== 'none' ? `glow-${glow}` : '';

    return (
        <div
            className={cn("glass-panel p-6 shadow-xl transition-all duration-300", glowClass, className)}
            {...props}
        >
            {children}
        </div>
    );
};
