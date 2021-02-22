const express = require('express');
const cors = require('cors');

const userRouter = require('../routes/user');
const libroRouter = require('../routes/libros');
const loanRouter = require('../routes/loans'); 

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath='/api/users';
        this.libroPath='/api/libros';
        this.loansPath='/api/loans';

        this.app.set('json spaces', 2);

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
        // json
        this.app.use(express.urlencoded({extended:false}));

        //file static
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usersPath,userRouter);
        this.app.use(this.libroPath,libroRouter);
        this.app.use(this.loansPath,loanRouter);
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`)
        });
    }
}

module.exports= Server
