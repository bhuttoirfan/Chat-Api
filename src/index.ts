import express, { Application, Request, Response, NextFunction } from 'express';

import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import morgan from "morgan";

import { main_api } from './routes/index.routes';
import {MongoDb} from './config/mongodb.conn';
import { mongo_cluster, db_name, user_name, password,  } from './utils/constants.utils';
import {Server} from 'http';

let server: Server | null = null;
const PORT = process.env.PORT || 3000;

function initApplication(): express.Application {

    // build connection with mongo
    new MongoDb().connect(mongo_cluster, db_name, user_name, password );
    
    // create instance of express to use middlewares
    const app = express();

    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(express.static("public"));
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        }
    }));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(main_api);
    
    return app;
}

function start() {
    const app = initApplication();

    server = app.listen(process.env.PORT || PORT, () => {
        console.log('Server started on PORT:' + PORT);
    });
}

start();