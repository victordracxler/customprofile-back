import { public_users } from '@prisma/client';
import userRepository from 'repositories/users-repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function signUp(params: SignUpParams) {
	const userExists = await userRepository.findUserByEmail(params.email);

	if (userExists) {
		throw {
			name: 'ConflictError',
			message: 'This email is already signed up',
		};
	}

	const hashPassword = bcrypt.hashSync(params.password, 10);

	const userData = {
		email: params.email,
		password: hashPassword,
		name: params.name,
	};

	await userRepository.createUser(userData);

	return;
}

async function signIn(params: SignInParams) {
	const user = await userRepository.findUserByEmail(params.email);
	if (!user) {
		throw {
			name: 'UnauthorizedError',
			message: 'This email does not exist',
		};
	}

	const isPasswordValid = await bcrypt.compare(
		params.password,
		user.password
	);
	if (!isPasswordValid)
		throw {
			name: 'UnauthorizedError',
			message: 'Invalid credentials',
		};

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

	return {
		token,
	};
}

export type SignUpParams = Pick<public_users, 'email' | 'password' | 'name'>;
export type SignInParams = Pick<public_users, 'email' | 'password'>;

const authenticationService = {
	signIn,
	signUp,
};

export default authenticationService;
