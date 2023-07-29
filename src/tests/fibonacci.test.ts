import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import fibonacciRoutes from '../routes/fibonacci.routes';

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // Use the bodyParser middleware to parse JSON data

app.use('/api/fibonacci', fibonacciRoutes); //Fibonacci router

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

});
