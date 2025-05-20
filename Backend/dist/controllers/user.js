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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, password, email, credential } = req.body;
    const userUnique = yield user_1.User.findOne({ where: { [sequelize_1.Op.or]: { email: email, credential: credential } } });
    if (userUnique) {
        res.status(400).json({
            msg: `El usuario ya existe con el email ${email} o credencial => ${credential}`
        });
        return;
    }
    console.log("Estoy por aqui");
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    try {
        user_1.User.create({
            name: name,
            lastname: lastname,
            password: passwordHash,
            email: email,
            credential: credential,
            status: 1
        });
        res.json({
            msg: `Usuario ${name} ${lastname} se creo con exito`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear el usuario con el email ${name}  ${lastname}.`
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    // res.json({
    //     msg: `Inicio de sesión exitoso =>`,
    //     body: req.body
    // })
    const { email, password } = req.body;
    const userOne = yield user_1.User.findOne({ where: { email: email } });
    if (!userOne) {
        res.status(400).json({
            msg: `Usuario no existe con el email => ${email}`
        });
        return;
    }
    const passwordValid = yield bcrypt_1.default.compare(password, userOne.password);
    if (!passwordValid) {
        res.status(400).json({
            msg: `Password incorrecto => ${password}`
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ email: email }, process.env.SECRET_KEY || 'bd2cf16adffe63710f4bb73dce4744c695eedc0f5d65818f3bb137f8357716742ed1de5db1a2ef5ed4482726dc3fe636ecba2e5db3055b7a58f54ae17dee73a8d8139c98ef427f7c64f51322e5144aac2643f2dc504cf339dfd7286182a3903e70d2b6ab7be31ac04132f5ff8ec4b45e42e3395d82cf1339d146eecc47040f5ad19db9d1b1eefd547ca56fc675c2f6c783a935729544c3ab8b96a1c94d7ebc6b025e153b8bdac3f4ce3718788dfbb812954225b89c7a1dd0872c5edd0bac11411218b6e3f8f180f78c556fbb6d0a341d259bc05b40890fe55fe936495868c2e319475c3331bff8aca733acaeb671289a984c3059d62f90fa7208b3f009683ae0', {});
    res.json({
        token,
        user: {
            id: userOne.id,
            email: userOne.email,
            name: userOne.name
        }
    });
});
exports.login = login;
