import express, { Request, Response } from 'express';
import { getProviderInstance } from '../utils/rate-providers/get-provider';

const router = express.Router();

import { RateProvider } from '../models/rate-provider';
import { splitPair } from '../utils/misc';

router.get(
  '/api/rates/:provider/:pair',
  async (req: Request, res: Response) => {
    const { provider, pair } = req.params;
    const { base, dest } = splitPair(pair);

    const data = await RateProvider.findOne({ provider, base });

    res.send(data ? { base, dest, rate: data.rates[dest] } : {});
  }
);

router.post(
  '/api/rates/:provider/roster',
  async (req: Request, res: Response) => {
    const { provider } = req.params;
    const delete1 = RateProvider.deleteMany({});

    const serviceProvider = getProviderInstance(provider);
    const { base, rates } = await serviceProvider.getRates({
      base: 'EUR',
      symbols: 'USD,ARS,BRL',
    });

    const exchageRates = [
      {
        base,
        rates,
      },
      {
        base: 'USD',
        rates: {
          ARS: 0,
          BRL: 0,
        },
        reference: 'EUR',
      },
      {
        base: 'BRL',
        rates: {
          ARS: 0,
        },
        reference: 'USD',
      },
    ];

    exchageRates
      .filter((data) => data.reference)
      .forEach((data) => {
        const ref: any = exchageRates.find(
          (item) => item.base === data.reference
        );
        Object.keys(data.rates).forEach((key) => {
          data.rates[key] = (1 / ref.rates[data.base]) * ref.rates[key];
        });
      });

    exchageRates.forEach(async (item) => {
      const rate = RateProvider.build({
        provider,
        base: item.base,
        rates: item.rates,
      });
      await rate.save();
    });

    res.status(201).send({});
  }
);

export { router as currentUserRouter };
