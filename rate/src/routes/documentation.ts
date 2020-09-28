import express, { Request, Response } from 'express';
import path from 'path';

const swaggerCombine = require('swagger-combine');
const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      swaggerDoc?: string;
    }
  }
}

router.get('/api/rates/swagger-json', async (req: Request, res: Response) => {
  const documentation = await swaggerCombine(
    path.join(__dirname, '/../documentation/index.yaml')
  );

  res.json(documentation);
});

router.get('/api/rates/api-docs', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views/swagger.html'));
});

export { router as documentationRouter };
