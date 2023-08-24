import { Prisma } from '@prisma/client';
import { prisma } from 'config';

async function createUserInfo(data) {
	return prisma.public_infos.create({
		data,
	});
}

// async function updateUserInfo(data: Prisma.public_infosUncheckedUpdateInput) {
// 	return prisma.public_infos.update();
// }

async function getUserInfo(userId: number) {
	return prisma.public_infos.findFirst({
		where: {
			userId,
		},
	});
}
const infoRepository = {
	createUserInfo,
	getUserInfo,
};

export default infoRepository;
