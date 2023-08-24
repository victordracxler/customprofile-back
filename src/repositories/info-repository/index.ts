import { Prisma } from '@prisma/client';
import { prisma } from 'config';

async function createUserInfo(data) {
	return prisma.public_infos.create({
		data,
	});
}

async function getUserInfo(userId: number) {
	return prisma.public_infos.findFirst({
		where: {
			userId,
		},
	});
}
async function updateUserInfo(
	data: Prisma.public_infosUpdateInput,
	id: number
) {
	return prisma.public_infos.update({
		where: {
			id,
		},
		data: data,
	});
}

async function findIdByUserId(userId: number) {
	return prisma.public_infos.findFirst({
		where: { userId },
		select: { id: true },
	});
}

const infoRepository = {
	createUserInfo,
	getUserInfo,
	updateUserInfo,
	findIdByUserId,
};

export default infoRepository;
