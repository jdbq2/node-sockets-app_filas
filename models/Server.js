const express = require("express");
const cors = require("cors");
const http = require("http");
const io = require("socket.io");
const { socketController } = require("../sockets/controller");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = io(this.server);
        //Midlewares
        this.middlewares();
        //rutas
        this.routes();
        //sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        //RUTAS DE SERVICIOS
    }

    sockets() {
        this.io.on("connection", socketController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
    middlewares() {
        //CORS
        this.app.use(cors());
        //Directorio Publico
        this.app.use(express.static("public"));
    }
}

module.exports = Server;
