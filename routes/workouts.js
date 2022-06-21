import express from 'express';
import { createWorkout, getWorkout, getSingleWorkout } from '../controllers/workoutController.js' 

const router = express.Router();

// get all the workouts
router.get('/', getWorkout)

// get a single workout
router.get('/:id', getSingleWorkout)

// post a new workout
router.post('/', createWorkout)

// delete a workout
router.delete('/:id', (req, res) => {
    res.json({msg: "Deleting a workout"})
})

// update a workout
router.patch('/:id', (req, res) => {
    res.json({msg: "Updating a workout"})
})

export default router