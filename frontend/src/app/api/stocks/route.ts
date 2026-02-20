import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const response = await fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols=YPFD.BA,GGAL.BA');
        if (!response.ok) {
            throw new Error('Failed to fetch from Yahoo Finance');
        }
        const data = await response.json();
        const result = data.quoteResponse?.result || [];

        // Map array to object: { "YPFD": price, "GGAL": price }
        const prices = result.reduce((acc: any, quote: any) => {
            const symbol = quote.symbol.split('.')[0]; // "YPFD.BA" -> "YPFD"
            acc[symbol] = quote.regularMarketPrice;
            return acc;
        }, {});

        return NextResponse.json({ success: true, prices });
    } catch (error) {
        console.error('Error fetching stock prices:', error);
        return NextResponse.json({ success: false, prices: { YPFD: 0, GGAL: 0 } }, { status: 500 });
    }
}
