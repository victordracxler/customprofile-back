import { Prisma, public_infos, public_users } from '@prisma/client';
import infoRepository from 'repositories/info-repository';
import userRepository from 'repositories/users-repository';

async function getInfo(userId: number) {
	try {
		const userInfo = await infoRepository.getUserInfo(userId);

		return userInfo;
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

const infoService = {
	getInfo,
	createInfoOnSignUp,
};

export default infoService;
