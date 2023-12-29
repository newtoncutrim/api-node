import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import routes from './router';
import cors from 'cors'
class App {
    constructor(){
        this.server = express();


        mongoose.connect('mongodb+srv://newton:<senha>@cluster0.6ryd864.mongodb.net/?retryWrites=true&w=majority')
        this.middleware()
        this.routes()
    }

    middleware(){
        this.server.use(cors())
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );

        this.server.use(express.json())
    }

    routes(){
        this.server.use(routes)
    }
}

export default new App().server;
