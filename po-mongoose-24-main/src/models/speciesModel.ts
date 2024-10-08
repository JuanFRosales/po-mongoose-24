import {model, Schema} from 'mongoose';
import {Species, SpeciesModel} from '../types/Species';
import { Polygon } from 'geojson';

const speciesSchema = new Schema<Species>({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

speciesSchema.index({ location: '2dsphere' });


speciesSchema.statics.findByArea = function (polygon: Polygon): Promise<Species[]> {
  return this.find({
    location: {
      $geoWithin: {
        $geometry: {
          type: 'Polygon',
          coordinates: polygon.coordinates,
        },
      },
    },
  });
};

export default model<Species, SpeciesModel>('Species', speciesSchema);
