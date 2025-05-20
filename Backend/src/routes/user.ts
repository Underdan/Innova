import { Router } from "express";
import { login, register } from "../controllers/user";
import express, { Application } from 'express';

const router = Router();
express.json();
router.post("/api/user/register", register)
express.json();
router.post("/api/user/login", login)

export default router