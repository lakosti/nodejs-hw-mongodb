import express from 'express';
import cors from 'cors';
import env from './utils/env.js';
import pino from 'pino-http';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';
import contactsRouter from './routers/contacts.js';
import auth from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constans/constans.js';
import { swaggerDocs } from './middleware/swaggerDocs.js';

const port = env('PORT', '3000');

export function setupServer() {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use(express.json());

  app.use('/auth', auth);
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () => console.log(`Server is running on port ${port}`));
}
