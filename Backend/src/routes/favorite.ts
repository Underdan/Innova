import { Router } from 'express';
import { addFavorite, getFavorites,deleteFavorite } from '../controllers/favorite';

const router = Router();

router.post('/add', addFavorite);
router.get('/:userId', getFavorites);
router.delete('/:userId/:videoId', deleteFavorite);

export default router;
