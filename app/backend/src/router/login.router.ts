import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const router = Router();
const loginService = new UserService();
const loginController = new UserController(loginService);

router.post('/', validateLogin, (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  validateToken.tokenVerification,
  (req: Request, res: Response) => UserController.getRole(req, res),
);

export default router;
