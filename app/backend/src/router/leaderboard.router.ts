import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

const router = Router();
const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getAway(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.getAllTeams(req, res),
);

export default router;
