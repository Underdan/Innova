import { Request, Response } from 'express';
import { Favorite } from '../models/favorite';

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  const { userId, videoId, title, description, thumbnail } = req.body;

  try {
    const exists = await Favorite.findOne({ where: { userId, videoId } });
    if (exists) {
      res.status(400).json({ error: 'Ya está en favoritos' });
      return;
    }

    const favorite = await Favorite.create({ userId, videoId, title, description, thumbnail });
    res.json({ favorite });
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    res.status(500).json({ error: 'Error al guardar favorito' });
  }
};

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.findAll({ where: { userId } });
    res.json({ favorites });
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
};

export const deleteFavorite = async (req: Request, res: Response): Promise<void> => {
  const { userId, videoId } = req.params;

  try {
    const deleted = await Favorite.destroy({ where: { userId, videoId } });

    if (deleted) {
      res.json({ msg: 'Eliminado correctamente' });
    } else {
      res.status(404).json({ msg: 'Favorito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar favorito' });
  }
};

