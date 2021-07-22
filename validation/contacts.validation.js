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

exports.validateId = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const result = schema.validate(req[reqPart]);
    const message = "Invalid ID or a field missing";
    if (result.error) {
      return res.status(400).json({ message });
    }

    next();
  };
};

exports.validateStatus = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const result = schema.validate(req[reqPart]);
    const message = "Missing field favorite";
    if (result.error) {
      return res.status(400).json({ message });
    }

    next();
  };
};

exports.validateSignUp = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const result = schema.validate(req[reqPart]);
    const message = "Ошибка от Joi или другой библиотеки валидации";
    if (result.error) {
      return res.status(400).json({ message });
    }

    next();
  };
};

exports.validateLogIn = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const result = schema.validate(req[reqPart]);
    const message = "Email or password is wrong";
    if (result.error) {
      return res.status(401).json({ message });
    }

    next();
  };
};
