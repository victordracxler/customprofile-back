import { Prisma, public_infos, public_users } from '@prisma/client';
import infoRepository from 'repositories/info-repository';
import userRepository from 'repositories/users-repository';
import multer from 'multer';

async function getInfo(userId: number) {
	try {
		const userInfo = await infoRepository.getUserInfo(userId);
		const userEmail = await userRepository.getEmailByUserId(userId);

		const allInfo = { ...userInfo, ...userEmail };
		return allInfo;
	} catch (error) {
		console.log(error);
	}
}
async function createInfoOnSignUp(user: public_users) {
	const { id, name } = user;

	const spacePosition = name.indexOf(' ');
	const firstName = name.substring(0, spacePosition);
	const lastName = name.substring(spacePosition + 1);

	const data = {
		firstName,
		lastName,
		userId: id,
	};
	console.log(data);

	try {
		const createUserInfo = await infoRepository.createUserInfo(data);
	} catch (error) {
		console.log(error);
	}
}

async function updateUserInfoService(data) {
	console.log('to no service', data);
}

const infoService = {
	getInfo,
	createInfoOnSignUp,
	updateUserInfoService,
};

export default infoService;
