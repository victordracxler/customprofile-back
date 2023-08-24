import httpStatus from 'http-status';
import { Request, Response } from 'express';

import infoService from 'services/info-services';

export async function getInfo(req: Request, res: Response) {
	const { userId } = req.params;

	try {
		const userInfo = await infoService.getInfo(Number(userId));

		return res.status(httpStatus.OK).send(userInfo);
	} catch (error) {
		return res.status(httpStatus.NOT_FOUND).send(error);
	}
}

export async function mostrarInfo(req, res: Response) {
	const { userId } = req.params;
	console.log('file ', req.file);
	console.log('to no router ', req.body);
	await infoService.updateUserInfoService(req.body);

	res.send('foi');
}
