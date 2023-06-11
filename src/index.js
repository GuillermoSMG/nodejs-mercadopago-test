import express from 'express';
import morgan from 'morgan';
import path from 'path';

import paymentRoutes from './routes/payment.routes.js';
import { PORT } from './config.js';

const app = express();

app.use(morgan('dev'));
app.use(paymentRoutes);

app.use(express.static(path.resolve('src/public')));

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
