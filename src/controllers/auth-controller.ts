import httpStatus from 'http-status';
import { Request, Response } from 'express';
import authenticationService, {
	SignInParams,
	SignUpParams,
} from 'services/authentication-services';

export async function signUp(req: Request, res: Response) {
	const { email, password, name } = req.body as SignUpParams;

	try {
		const login = await authenticationService.signUp({
			email,
			password,
			name,
		});

		return res.status(httpStatus.OK).send(login);
	} catch (error) {
		return res.status(httpStatus.UNAUTHORIZED).send(error);
	}
}

export async function signIn(req: Request, res: Response) {
	const { email, password } = req.body as SignInParams;

	try {
		const login = await authenticationService.signIn({
			email,
			password,
		});

		return res.status(httpStatus.OK).send(login);
	} catch (error) {
		return res.status(httpStatus.UNAUTHORIZED).send(error);
	}
}
