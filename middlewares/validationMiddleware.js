export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    const errors = error.errors.reduce((acc, err) => {
      acc[err.path[0]] = err.message;
      return acc;
    }, {});

    res.status(400).json({
      message: "Validation failed",
      details: errors,
    });
  }
};
