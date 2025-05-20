"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const express_2 = __importDefault(require("express"));
const router = (0, express_1.Router)();
express_2.default.json();
router.post("/api/user/register", user_1.register);
express_2.default.json();
router.post("/api/user/login", user_1.login);
exports.default = router;
