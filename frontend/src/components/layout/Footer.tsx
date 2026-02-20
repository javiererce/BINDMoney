import React from 'react';

export const Footer = () => {
    return (
        <footer className="w-full glass-panel border-b-0 rounded-none border-x-0 mt-20 py-8">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} BINDMoney. Generando conciencia financiera.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                    100% Gratuito y Libre de Publicidad
                </p>
            </div>
        </footer>
    );
};
