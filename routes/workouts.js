import express from 'express';
import workoutModel from '../model/workoutModel.js';

const router = express.Router();

// get all the workouts
router.get('/', (req, res) => {
    res.json({msg: "Get all workouts"})
})

// get a single workout
router.get('/:id', (req, res) => {
    res.json({msg: "Get a single workout"})
})

// post a new workout
router.post('/', async (req, res) => {

    // all the information that comes along in the req 
    const { title, reps, load } = req.body;

    try{

        const workout = await workoutModel.create({
            title, reps, load
        })

        res.status(200).json("Workout saved!")
    }
    catch(error){
        res.status(400).json({error: "Something went wrong..."})
    }
})

// delete a workout
router.delete('/:id', (req, res) => {
    res.json({msg: "Deleting a workout"})
})

// update a workout
router.patch('/:id', (req, res) => {
    res.json({msg: "Updating a workout"})
})

export default router