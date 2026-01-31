import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/index.js';
import { errorHandler } from "./middlewares/error.middleware.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors(""));
app.use(morgan());

app.use('/api/', router)

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.use(errorHandler)

export default app;