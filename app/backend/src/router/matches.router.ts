import { Router, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';
import validateMatch from '../middlewares/validateMatches';

const router = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', (req: Request, res: Response) => matchesController.getMatches(req, res));
router.patch(
  '/:id/finish',
  validateToken.tokenVerification,
  (req: Request, res: Response) => matchesController.finish(req, res),
);
router.patch(
  '/:id',
  validateToken.tokenVerification,
  (req: Request, res: Response) => matchesController.updateById(req, res),
);

router.post(
  '/',
  validateToken.tokenVerification,
  validateMatch.matchesVerification,
  (req: Request, res: Response) => matchesController.create(req, res),
);

export default router;
