"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorite_1 = require("../controllers/favorite");
const router = (0, express_1.Router)();
router.post('/add', favorite_1.addFavorite);
router.get('/:userId', favorite_1.getFavorites);
router.delete('/:userId/:videoId', favorite_1.deleteFavorite);
exports.default = router;
