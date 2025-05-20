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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVideos = void 0;
// File: Backend/controllers/youtube.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyA81YscnIqpldGzea6QBjzCcl7y1KN-UzU';
const searchVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    if (!query) {
        res.status(400).json({ error: 'Se requiere el término de búsqueda' });
        return;
    }
    try {
        const response = yield axios_1.default.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                key: YOUTUBE_API_KEY,
                maxResults: 10,
                type: 'video'
            }
        });
        const videos = response.data.items.map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url
        }));
        res.json({ videos });
    }
    catch (error) {
        console.error('Error en la API de YouTube:', error);
        res.status(500).json({ error: 'Error al buscar videos en YouTube' });
    }
});
exports.searchVideos = searchVideos;
