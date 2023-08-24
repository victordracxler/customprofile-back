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
