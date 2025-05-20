import express, { Application } from 'express';
import sequelize from '../database/connection';
import rUser from '../routes/user';
import { User } from './user';
import { Favorite } from './favorite';
import cors from 'cors';
import youtubeRoutes from '../routes/youtube';
import favoriteRoutes from '../routes/favorite';


class Server {
    private app: Application;
    private port: string;
    constructor() {
        //console.log("Daniel");
        this.app = express();
        this.port = process.env.PORT  || '3017';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnect();

        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(" Se ejecuta desde el puerto: " + this.port);
            
        })
    }

    router(){
        this.app.use(rUser)
        this.app.use('/api/youtube', youtubeRoutes);
        this.app.use('/api/favorites', favoriteRoutes);
    }

    midlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    async DBconnect() {
        try {
            await User.sync();
            await Favorite.sync(); // 👈 Agrega esta línea
            console.log("Tablas sincronizadas correctamente");
        } catch (error) {
            console.log("Error de conexión", error);
        }   
    }


}

export default Server