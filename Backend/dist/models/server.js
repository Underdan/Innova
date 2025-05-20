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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const user_2 = require("./user");
const favorite_1 = require("./favorite");
const cors_1 = __importDefault(require("cors"));
const youtube_1 = __importDefault(require("../routes/youtube"));
const favorite_2 = __importDefault(require("../routes/favorite"));
class Server {
    constructor() {
        //console.log("Daniel");
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3017';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(" Se ejecuta desde el puerto: " + this.port);
        });
    }
    router() {
        this.app.use(user_1.default);
        this.app.use('/api/youtube', youtube_1.default);
        this.app.use('/api/favorites', favorite_2.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_2.User.sync();
                yield favorite_1.Favorite.sync(); // 👈 Agrega esta línea
                console.log("Tablas sincronizadas correctamente");
            }
            catch (error) {
                console.log("Error de conexión", error);
            }
        });
    }
}
exports.default = Server;
