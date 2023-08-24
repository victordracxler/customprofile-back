import { getInfo } from 'controllers/info-controller';
import { Router } from 'express';

const infosRouter = Router();

infosRouter.get('/user-info/:userId', getInfo);

export { infosRouter };
