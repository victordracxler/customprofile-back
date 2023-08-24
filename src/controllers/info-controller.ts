import httpStatus from 'http-status';
import { Request, Response } from 'express';
import authenticationService, {
	SignUpParams,
} from 'services/authentication-services';

export async function getInfo(req: Request, res: Response) {
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
