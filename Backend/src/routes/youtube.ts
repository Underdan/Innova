import { Router } from 'express';
import { searchVideos } from '../controllers/youtube';

const router = Router();

router.get('/search', searchVideos);

export default router;
