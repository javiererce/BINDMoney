import { Request, Response } from 'express';

export const calculateInflation = (req: Request, res: Response) => {
    try {
        const { income, fixedExpenses, variableExpenses, inflationRate } = req.body;

        // Formula: Valor Real = Valor Nominal / (1 + inflation)^tiempo
        // inflationRate comes as percentage, e.g., 120
        const monthlyInflation = Math.pow(1 + (inflationRate / 100), 1 / 12) - 1;

        const projections = [6, 12, 24].map(months => {
            const realIncome = income / Math.pow(1 + monthlyInflation, months);
            const totalExpenses = fixedExpenses + variableExpenses;
            // Los gastos nominales suben con la inflación
            const projectedNominalExpenses = totalExpenses * Math.pow(1 + monthlyInflation, months);

            return {
                month: months,
                realIncome: parseFloat(realIncome.toFixed(2)),
                projectedNominalExpenses: parseFloat(projectedNominalExpenses.toFixed(2)),
                purchasingPowerLossPercent: parseFloat((((income - realIncome) / income) * 100).toFixed(2))
            };
        });

        const currentMonthlyLoss = income - (income / (1 + monthlyInflation));

        res.json({
            success: true,
            data: {
                currentMonthlyLoss: parseFloat(currentMonthlyLoss.toFixed(2)),
                projections
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error calculating inflation data' });
    }
};

export const calculateLifeHours = (req: Request, res: Response) => {
    try {
        const { income, weeklyHours, purchaseAmount } = req.body;

        const monthlyHours = weeklyHours * 4; // Aproximación
        const hourlyRate = income / monthlyHours;
        const dailyRate = hourlyRate * (weeklyHours / 5); // Suponiendo 5 días hábiles

        const hoursNeeded = purchaseAmount / hourlyRate;
        const daysNeeded = hoursNeeded / (weeklyHours / 5);
        const incomePercentage = (purchaseAmount / income) * 100;

        res.json({
            success: true,
            data: {
                hourlyRate: parseFloat(hourlyRate.toFixed(2)),
                dailyRate: parseFloat(dailyRate.toFixed(2)),
                hoursNeeded: parseFloat(hoursNeeded.toFixed(2)),
                daysNeeded: parseFloat(daysNeeded.toFixed(2)),
                incomePercentage: parseFloat(incomePercentage.toFixed(2))
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error calculating life hours data' });
    }
};
