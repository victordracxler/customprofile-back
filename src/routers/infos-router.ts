import { getInfo, updateInfo } from 'controllers/info-controller';
import { Router } from 'express';
import { upload } from 'middlewares/multer';

const infosRouter = Router();

infosRouter
	.get('/user-info/:userId', getInfo)
	.post('/user-info/:userId', upload.single('imageUploaded'), updateInfo);

export { infosRouter };
