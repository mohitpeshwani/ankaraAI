import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Backend Testing',
  });
});
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  // Your server startup code here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
