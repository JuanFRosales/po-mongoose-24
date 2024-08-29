import express from 'express';
import {
  deleteAnimal,
  getSingleAnimal,
  getAnimal,
  postAnimal,
  putAnimal,
  getAnimalsByBox,
  getBySpecies,
} from '../controllers/animalController';

const router = express.Router();

router.route('/').post(postAnimal).get(getAnimal);

router.route('/location').get(getAnimalsByBox);

router.route('/:id').get(getSingleAnimal).put(putAnimal).delete(deleteAnimal);

router.route('/species/:species').get(getBySpecies);

export default router;
