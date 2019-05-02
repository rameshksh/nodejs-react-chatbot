
import { Express, Router, Request, Response } from 'express';

export class IndexRoute {    

    constructor(private app: Express) {
        this.app = app;

        this.app.get('/', function (req, res) {
            return res.render('index.html');
        });       
    }
}

