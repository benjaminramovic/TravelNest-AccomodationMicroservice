import express from 'express';
import { getAllAccommodations, getAccommodationById, createAccommodation, deleteAccommodation } from '../controllers/accommodationController.js';
import upload from '../config/multer.js';

const accommodationRouter = express.Router();

accommodationRouter.get('/', getAllAccommodations);
accommodationRouter.get('/:id', getAccommodationById);
accommodationRouter.post('/', upload.array('images',10), createAccommodation);
accommodationRouter.delete('/:id', deleteAccommodation);

export default accommodationRouter;