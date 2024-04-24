// src/api-key.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;

    if (apiKey === validApiKey) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
