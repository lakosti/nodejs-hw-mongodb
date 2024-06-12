import express from 'express';
import cors from 'cors';

//http://localhost:3000/contacts

export function setupServer() {
  const app = express();

  app.use(cors());

  app.get('/contacts', (req, res) => {
    res.json();
  });
  app.get('/contacts/:contactId', (req, res) => {
    res.json();
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  });

  const PORT = 3000;

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
