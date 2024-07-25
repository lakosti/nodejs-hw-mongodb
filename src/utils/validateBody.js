import createHttpError from 'http-errors';

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const responseError = createHttpError(400, error.message, {
        errors: error.details,
      });
      next(responseError);
    }
  };
};

export default validateBody;

///
// import createHttpError from 'http-errors';

// export const validateBody = (schema) => async (req, res, next) => {
//   try {
//     if (req.file) {
//       return next();
//     }

//     await schema.validateAsync(req.body, {
//       abortEarly: false,
//     });

//     next();
//   } catch (err) {
//     const error = createHttpError(400, `${err.message}`);
//     next(error);
//   }
// };
