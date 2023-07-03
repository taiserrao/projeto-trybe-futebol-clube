import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import ITeamsInformations from './ITeamsInformations';

export default interface LeaderBoardControllerInterface {
  getHome(
    req: Request,
    res: Response,
  ): Promise<Response<ITeamsInformations[] | { message: string }>>;
}
