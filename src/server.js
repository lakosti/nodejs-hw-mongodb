import express from 'express';
import cors from 'cors';

import env from './utils/env.js';
import pino from 'pino-http';
import { getContactById, getContacts } from './services/contacts.js';

//http://localhost:3000/contacts

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

  app.get('/contacts', async (req, res) => {
    //? контролер (обробка даних)
    const data = await getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const data = await getContactById(contactId);

      if (!data) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }

      res.json({
        status: 200,
        data,
        message: `Successfully found contact with id ${contactId}!`,
      });
    } catch (error) {
      if (error.message.includes('Cast to ObjectId failed')) {
        error.status = 404;
      }
      const { status = 500 } = error;
      res.status(status).json({
        message: error.message,
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  });

  app.listen(port, () => console.log(`Server is running on port ${port}`));
}
