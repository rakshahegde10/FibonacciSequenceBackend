import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import fibonacciRoutes from '../routes/fibonacci.routes';
import cors from 'cors';
import helmet from 'helmet';

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' })); // Allow requests from any origin

app.use(bodyParser.json()); // Use the bodyParser middleware to parse JSON data

app.use('/api/fibonacci', fibonacciRoutes); //Fibonacci router

app.use(helmet());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Close the server when done
  server.close(() => {
    console.log('Server is closed');
  });
});

//tests to check API
describe('Fibonacci API', () => {
  it('should generate and return a Fibonacci sequence', async () => {
    const response = await request(app).post('/api/fibonacci/').send({ inputNumber: 10 });

    expect(response.status).toBe(200);
    expect(response.body.fibonacciNumbers).toEqual(["0", "1", "1", "2", "3", "5", "8", "13", "21", "34"]);
  });

  it('should return an error if the input is not a positive integer', async () => {
    const response = await request(app).post('/api/fibonacci/').send({ inputNumber: 'fibonacci' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Please provide a valid positive integer.' });
  });

  it('should return an error if the input is a negative number', async () => {
    const response = await request(app).post('/api/fibonacci/').send({ inputNumber: -5 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Please provide a valid positive integer.' });
  });

  it('should return an error if the input is zero', async () => {
    const response = await request(app).post('/api/fibonacci/').send({ inputNumber: 0 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Please provide a valid positive integer.' });
  });

  it('should generate and return a Fibonacci sequence for a large input number', async () => {
    const response = await request(app).post('/api/fibonacci/').send({ inputNumber: 25 });

    expect(response.status).toBe(200);
    expect(response.body.fibonacciNumbers).toHaveLength(25);
  });

  it('should return an error if the inputNumber field is missing', async () => {
    const response = await request(app).post('/api/fibonacci/').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Please provide a valid positive integer.' });
  });

  it('should return 404 Not Found for an invalid endpoint', async () => {
    const response = await request(app).post('/api/invalid_endpoint/').send({ inputNumber: 5 });

    expect(response.status).toBe(404);
  });

});
