exports.validateCreate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const result = schema.validate(req[reqPart]);
    const message = "Missing required name field";
    if (result.error) {
      return res.status(400).json({ message });
    }

    next();
  };
};

exports.validateUpdate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const result = schema.validate(req[reqPart]);
    const message = "Missing fields";
    if (result.error) {
      return res.status(400).json({ message });
    }

    next();
  };
};
