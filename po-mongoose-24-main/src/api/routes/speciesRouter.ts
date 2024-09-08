import express from 'express';
import {
  deleteSpecies,
  getSingleSpecies,
  getSpecies,
  postSpecies,
  putSpecies,
  getSpeciesByLocation,
} from '../controllers/speciesController';
import {addImageToSpecies} from '../../middlewares';

const router = express.Router();

router.route('/').post(addImageToSpecies, postSpecies).get(getSpecies);


router
.route('/:id')
.get(getSingleSpecies)
.put(putSpecies)
.delete(deleteSpecies);

router.route('/species/area').post(getSpeciesByLocation);


export default router;
