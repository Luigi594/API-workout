import mongoose from 'mongoose';
import workoutModel from '../model/workoutModel.js';

// get all workouts
const getWorkout = async (req, res) => {

    // ordered by descending
    const workouts = await workoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workouts);
}

// get a single workout
const getSingleWorkout = async (req, res) => {

    // getting the id for a single workout
    const { id } = req.params;

    // if the id we got is not valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "No such workout"});
    }

    const workout = await workoutModel.findById(id);

    // if the workout doesn't exists, we return something because if 
    // we don't, the rest of the code will be executed and we don't want that
    if(!workout){
        return res.status(400).json({msg: "No such workout"})
    }

    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {

    // all the information that comes along in the req 
    const { title, reps, load } = req.body;

    const workout =  await workoutModel.create({
        title, reps, load
    })

    res.status(200).json(workout)
    
}

// delete workout
const deleteWorkout = async (req, res) => {

    const { id } = req.params;

    // if the id we got is not valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "No such workout"});
    }

    const workout = await workoutModel.findOneAndDelete({
        _id: id
    })

    if(!workout){
        return res.status(400).json({msg: "No such workout"})
    }

    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {

    const { id } = req.params;

    // if the id we got is not valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "No such workout"});
    }

    /** ...req.body, whatever the properties are on the body
     * the body is an object
     */
    const workout = await workoutModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(400).json({msg: "No such workout"})
    }

    res.status(200).json({msg: "Workout updated succesfully!"})
}

// exporting all the functions
export { createWorkout, getWorkout, getSingleWorkout, deleteWorkout, updateWorkout }