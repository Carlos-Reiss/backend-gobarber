import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticatied from '../middlewares/ensureAuthenticatied';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticatied);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
