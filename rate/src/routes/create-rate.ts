import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../http/middlewares';
import { Rate } from '../models/rate';
import { calculateFeeAmount, calculateFeeWithMarkUp } from '../utils/misc';

const router = express.Router();

router.post(
  '/api/rates',
  [
    body('provider').exists().withMessage('Provider is required.'),
    body('pair').exists().withMessage('Pair is required.'),
    body('rate').exists().withMessage('Rate is required.'),
    body('fee_percent').exists().withMessage('Fee Percent is required.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { provider, pair, fee_percent, rate } = req.body;

    const item = Rate.build({
      provider,
      pair,
      fee_percent,
    });
    await item.save();

    res.status(201).send({
      provider: item.provider,
      pair: item.pair,
      rate: rate,
      fee_percent: item.fee_percent,
      fee_amount: calculateFeeAmount(rate, item.fee_percent),
      fee_mark_up: calculateFeeWithMarkUp(rate, item.fee_percent),
    });
  }
);

export { router as createRateRouter };
