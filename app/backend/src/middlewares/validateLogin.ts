import { Response, Request, NextFunction } from 'express';

const BadRequestError = 'All fields must be filled';
const FormatInvalidError = 'Invalid email or password';

const emailFormat = (
  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
);

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: BadRequestError });
  }

  const validEmail = emailFormat.test(email);

  if (validEmail === false) {
    return res.status(401).json({ message: FormatInvalidError });
  }

  if (password.length < 6) {
    return res.status(401).json({ message: FormatInvalidError });
  }

  next();
};

export default validateLogin;
