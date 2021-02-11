const express = require('express');
const cors = require('cors');

const userRouter = require('../routes/user');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath='/api/users';

        //Middlewares
        this.middlewares();
        //routes
        this.routes();
    }


    middlewares() {

        //cors
        this.app.use(cors());

        //body 
        this.app.use(express.json());

        //file static
        this.app.use(express.static('public'));


    }

    routes() {
        this.app.use(this.usersPath,userRouter);
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`)
        });
    }
}

module.exports= Server
