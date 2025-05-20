"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const youtube_1 = require("../controllers/youtube");
const router = (0, express_1.Router)();
router.get('/search', youtube_1.searchVideos);
exports.default = router;
