import express from 'express';
import bodyParser from 'body-parser';
import fibonacciRoutes from './routes/fibonacci.routes';
import cors from 'cors';
import helmet from 'helmet';

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' })); // Allow requests from any origin

app.use(bodyParser.json()); // Use the bodyParser middleware to parse JSON data

app.use('/api/fibonacci', fibonacciRoutes); //Fibonacci router

app.use(helmet());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});