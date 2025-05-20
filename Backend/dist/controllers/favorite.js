"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = exports.getFavorites = exports.addFavorite = void 0;
const favorite_1 = require("../models/favorite");
const addFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, videoId, title, description, thumbnail } = req.body;
    try {
        const exists = yield favorite_1.Favorite.findOne({ where: { userId, videoId } });
        if (exists) {
            res.status(400).json({ error: 'Ya está en favoritos' });
            return;
        }
        const favorite = yield favorite_1.Favorite.create({ userId, videoId, title, description, thumbnail });
        res.json({ favorite });
    }
    catch (error) {
        console.error('Error al agregar favorito:', error);
        res.status(500).json({ error: 'Error al guardar favorito' });
    }
});
exports.addFavorite = addFavorite;
const getFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const favorites = yield favorite_1.Favorite.findAll({ where: { userId } });
        res.json({ favorites });
    }
    catch (error) {
        console.error('Error al obtener favoritos:', error);
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
});
exports.getFavorites = getFavorites;
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, videoId } = req.params;
    try {
        const deleted = yield favorite_1.Favorite.destroy({ where: { userId, videoId } });
        if (deleted) {
            res.json({ msg: 'Eliminado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Favorito no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar favorito' });
    }
});
exports.deleteFavorite = deleteFavorite;
