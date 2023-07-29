import { Request, Response } from 'express';
import Fibonacci from '../models/fibonacci.model';


// Function to generate Fibonacci numbers up to the given input number
const generateFibonacciNumbers = (inputNumber: number): number[] => {
  const fibNumbers: number[] = [0, 1];
  for (let i = 2; i < inputNumber; i++) {
    const nextFib = fibNumbers[i - 1] + fibNumbers[i - 2];
    fibNumbers.push(nextFib);
  }
  return fibNumbers;
};

// Controller function to handle the generation and retrieval of Fibonacci data
export const generateFibonacciData = async (req: Request, res: Response) => {

  const { inputNumber } = req.body; // get the inputNumber from request body

  const numberValue = parseInt(inputNumber, 10); // Convert to a valid positive integer

  if (isNaN(numberValue) || numberValue <= 0) {
    return res.status(400).json({ error: 'Please provide a valid positive integer.' });
  }

  const existingFibonacciCount = await Fibonacci.count(); // Count the number of existing Fibonacci entries in the database

  try {

    // Check if entry already exists in the database
    const existingFibonacci = await Fibonacci.findOne({
      where: { inputNumber: numberValue },
    });

    if (existingFibonacci) {
      // If the entry exists then return the existing Fibonacci sequence
      return res.status(200).json({ fibonacciNumbers: existingFibonacci.fibSequence.split(', ') });
    } else {
      // If the entry does not exist then generate a new Fibonacci sequence
      const result = generateFibonacciNumbers(numberValue);
      const fibSequence = result.join(', ');

    // Prepare the new Fibonacci entry object
    const newFib = {
      inputNumber: numberValue,
      fibSequence: fibSequence,
      id: 0
    };

    newFib.id = existingFibonacciCount + 1; //to increment id in database

    const newFibonacci = Fibonacci.build(newFib);
    newFibonacci.save(); //save to database

    res.status(200).json({ fibonacciNumbers: result });
   }
  } catch (error) {
    console.error('Error during generation of Fibonacci Data:', error);
    res.status(500).json({ error: 'Internal server error during generating/fetching Fibonacci Data' });
  }
};




























