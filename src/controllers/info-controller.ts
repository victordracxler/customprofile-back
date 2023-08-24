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

export async function updateInfo(req: Request, res: Response) {
	const { userId } = req.params;
	const userIdNumber = Number(userId);
	const image = req.file;
	const body = req.body;
	const data = { body, image };

	try {
		await infoService.updateUserInfoService(data, userIdNumber);

		return res.status(httpStatus.OK).send('updated data');
	} catch (error) {
		return res.status(httpStatus.CONFLICT).send(error);
	}
}
