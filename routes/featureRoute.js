import express from 'express';
import { createFeature, getAllFeatures } from '../controllers/featureController.js';

const featureRouter = express.Router();

featureRouter.get('/', getAllFeatures)
featureRouter.post('/', createFeature)

export default featureRouter;