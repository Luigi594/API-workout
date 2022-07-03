import { body, validationResult } from 'express-validator';

const ValidatonFields = [

    body('title').isLength({ min: 5 }).withMessage("Title of workout is required. \n")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Only letters for the title workout. \n"),

    body('reps').matches(/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage("Reps must contain a positive number. \n"),

    body('load').matches(/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage("Load must contain a positive number. \n"),

    (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array().map((e) => e.msg)});
        }

        next();
    }
]

export { ValidatonFields }