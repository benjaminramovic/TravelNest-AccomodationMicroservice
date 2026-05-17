import express from 'express';
import {getAllRooms, getRoomById, createRoom, deleteRoom} from '../controllers/roomController.js';
import upload from '../config/multer.js';

const roomRouter = express.Router();

roomRouter.get('/',getAllRooms);
roomRouter.get('/:id',getRoomById);
roomRouter.post('/', upload.array('images', 20), createRoom);
roomRouter.delete('/:id',deleteRoom);



export default roomRouter;
