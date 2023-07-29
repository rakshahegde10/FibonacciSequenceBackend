import express from 'express';
import bodyParser from 'body-parser';
import fibonacciRoutes from './routes/fibonacci.routes';

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // Use the bodyParser middleware to parse JSON data

app.use('/api/fibonacci', fibonacciRoutes); //Fibonacci router

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});