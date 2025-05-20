"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, rest, next) => {
    const headersToken = req.headers['authorization'];
    console.log(headersToken);
    if (headersToken != undefined && headersToken.startsWith('Bearer ')) {
        try {
            const token = headersToken.slice(7);
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'bd2cf16adffe63710f4bb73dce4744c695eedc0f5d65818f3bb137f8357716742ed1de5db1a2ef5ed4482726dc3fe636ecba2e5db3055b7a58f54ae17dee73a8d8139c98ef427f7c64f51322e5144aac2643f2dc504cf339dfd7286182a3903e70d2b6ab7be31ac04132f5ff8ec4b45e42e3395d82cf1339d146eecc47040f5ad19db9d1b1eefd547ca56fc675c2f6c783a935729544c3ab8b96a1c94d7ebc6b025e153b8bdac3f4ce3718788dfbb812954225b89c7a1dd0872c5edd0bac11411218b6e3f8f180f78c556fbb6d0a341d259bc05b40890fe55fe936495868c2e319475c3331bff8aca733acaeb671289a984c3059d62f90fa7208b3f009683ae0');
            next();
        }
        catch (error) {
            msg: `Tokken invalido`;
        }
    }
    else {
        rest.status(401).json({
            msg: `Acceso denegado`
        });
    }
};
exports.default = validateToken;
