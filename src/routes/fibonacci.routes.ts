import { Router } from 'express';
import { generateFibonacciData } from '../controllers/fibonacci.controller';

const router = Router();

router.post('/', generateFibonacciData); // POST request to generate and save Fibonacci sequence

export default router;
