import { Router } from 'express';

import {
  createOrder,
  success,
  webhook,
} from '../controllers/payment.controllers.js';

const router = Router();

router.post('/create-order', createOrder);

router.get('/success', success);
router.get('/failure', (req, res) => res.send('Failure!'));
router.get('/pending', (req, res) => res.send('Pending!'));

router.post('/webhook', webhook);

export default router;
