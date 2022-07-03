import express from 'express';
import { createWorkout, getWorkout, getSingleWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js' 
import { ValidatonFields } from '../middleware/validations.js';

const router = express.Router();

// get all the workouts
router.get('/', getWorkout)

// get a single workout
router.get('/:id', getSingleWorkout)

// post a new workout
router.post('/', ValidatonFields, createWorkout)

// delete a workout
router.delete('/:id', deleteWorkout)

// update a workout
router.patch('/:id', updateWorkout)

export default router