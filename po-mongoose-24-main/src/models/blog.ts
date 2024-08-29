/*import mongoose from 'mongoose';
import SomeType from '../path/to/interface'

const Schema = mongoose.Schema;

const blogSchema = new Schema<SomeType>({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date, author: String }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

export default mongoose.model<SomeType>('Blog', blogSchema);

*/
