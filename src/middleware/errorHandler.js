import { HttpError } from 'http-errors';

//викидаємо помилку в залежності від статусу
const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    const { status, message } = error;
    res.status(status).json({
      status,
      message,
      data: error,
    });
    return;
  }

  //якщо помилка без статусу
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};

export default errorHandler;
