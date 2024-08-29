import {NextFunction, Request, Response} from 'express';
import {Animal} from '../../types/Animal';
import {MessageResponse} from '../../types/Messages';
import CustomError from '../../classes/CustomError';
import animalModel from '../../models/animalModel';

type DBMessageResponse = MessageResponse & {
  data: Animal | Animal[];
};

const postAnimal = async (
  req: Request<{}, {}, Animal>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const newAnimal = new animalModel(req.body);
    const savedAnimal = await newAnimal.save();

    res.status(201).json({
      message: 'Animal created',
      data: savedAnimal,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getAnimal = async (
  req: Request,
  res: Response<Animal[]>,
  next: NextFunction,
) => {
  try {
    const species = await animalModel.find().select('__v').populate({
      path: 'species',
      select: '-__v',
    });

    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getSingleAnimal = async (
  req: Request<{id: string}>,
  res: Response<Animal>,
  next: NextFunction,
) => {
  try {
    const species = await animalModel.findById(req.params.id);

    if (!species) {
      throw new CustomError('Animal not found', 404);
    }

    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const putAnimal = async (
  req: Request<{id: string}, {}, Animal>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const updatedAnimal = await animalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
    );

    if (!updatedAnimal) {
      throw new CustomError('Animal not found', 404);
    }

    res.json({
      message: 'Animal updated',
      data: updatedAnimal,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const deleteAnimal = async (
  req: Request<{id: string}>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const deletedAnimal = await animalModel.findByIdAndDelete(req.params.id);

    if (!deletedAnimal) {
      throw new CustomError('Animal not found', 404);
    }

    res.json({
      message: 'Animal deleted',
      data: deletedAnimal,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getAnimalsByBox = async (
  req: Request<{}, {}, {}, {topRight: string; bottomLeft: string}>,
  res: Response<Animal[]>,
  next: NextFunction,
) => {
  try {
    const {topRight, bottomLeft} = req.query;

    const animals = await animalModel.find({
      location: {
        $geoWithin: {
          $box: [topRight.split(','), bottomLeft.split(',')],
        },
      },
    });

    res.json(animals);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getBySpecies = async (
  req: Request<{species: string}>,
  res: Response<Animal[]>,
  next: NextFunction,
) => {
  try {
    const animals = await animalModel.findBySpecies(req.params.species);

    res.json(animals);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  postAnimal,
  getAnimal,
  getSingleAnimal,
  putAnimal,
  deleteAnimal,
  getAnimalsByBox,
  getBySpecies,
};
