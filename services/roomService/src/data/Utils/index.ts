import mongoose from 'mongoose';

const uri =
  'mongodb+srv://user:user@cluster0.y7ubd.mongodb.net/CoveyTown?retryWrites=true&w=majority';
const connection = async () :Promise<void>=> {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Database connected successfully');
};

export default connection;