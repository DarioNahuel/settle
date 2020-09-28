import express, { Request, Response } from 'express';

import { Rate } from '../models/rate';
import { RateProvider } from '../models/rate-provider';
import {
  calculateFeeAmount,
  calculateFeeWithMarkUp,
  splitPair,
} from '../utils/misc';

const router = express.Router();

router.get('/api/rates', async (req: Request, res: Response) => {
  const rates = await Rate.find({});
  const providerRates = await RateProvider.find({});

  const response = rates.map((rate) => {
    const { base, dest } = splitPair(rate.pair);
    const provider = providerRates.find((provider) => provider.base === base);
    const rateValue = provider?.rates[dest]!;

    return {
      provider: rate.provider,
      pair: rate.pair,
      rate: rateValue,
      fee_percent: rate.fee_percent,
      fee_amount: calculateFeeAmount(rateValue, rate.fee_percent),
      fee_mark_up: calculateFeeWithMarkUp(rateValue, rate.fee_percent),
    };
  });

  res.send(response);
});

export { router as getRateRouter };
