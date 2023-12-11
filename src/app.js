import express from 'express';
import mongoose from 'mongoose'
import routes from './router';

class App {
    constructor(){
        this.server = express();


        mongoose.connect('mongodb+srv://newton:saxalto98@cluster0.6ryd864.mongodb.net/?retryWrites=true&w=majority')
        this.middleware()
        this.routes()
    }

    middleware(){
        this.server.use(express.json())
    }

    routes(){
        this.server.use(routes)
    }
}

export default new App().server;