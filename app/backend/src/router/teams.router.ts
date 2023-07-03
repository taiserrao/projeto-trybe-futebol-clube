import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();
const newTeamController = new TeamController();

router.get('/', (_req: Request, res: Response) => newTeamController.getAll(_req, res));
router.get('/:id', (req: Request, res: Response) => newTeamController.getById(req, res));

export default router;
