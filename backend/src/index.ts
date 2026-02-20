import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import simulationRoutes from './routes/simulation.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/simulations', simulationRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'BINDMoney API is running successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
