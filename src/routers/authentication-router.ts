import { signIn, signUp } from 'controllers/auth-controller';
import { Router } from 'express';

const authenticationRouter = Router();

authenticationRouter.post('/sign-up', signUp).post('/sign-in', signIn);

export { authenticationRouter };
