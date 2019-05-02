import { Express, Router, Request, Response } from 'express';
import { PropertyService } from '../services/propertyService';
import { PropertyController } from '../controllers/propertyController';

export interface IApiRoute {
    get();
}

var self;
export class ApiRoute implements IApiRoute {
    controller: PropertyController;
    service: PropertyService;

    constructor(public app: Express) {

        this.app = app;

        let service = new PropertyService();
        this.controller = new PropertyController(service);

        self = this;

        this.get();
    }

    get() {
        this.app.get('/api/properties', (req: Request, res: Response) => {
            self.controller.getProperties(req, res);
        });

        this.app.get('/api/property/:id/summary', (req: Request, res: Response) => {
            self.controller.getPropertySummary(req, res);
        });

        this.app.get('/api/property/:id/floorplans', (req: Request, res: Response) => {
            self.controller.getPropertyFloorplans(req, res);
        });
        
        this.app.get('/api/property/:id/units', (req: Request, res: Response) => {
            self.controller.getPropertyUnits(req, res);
        });

        this.app.get('/api/property/:id/units/:unitId/rent-matrix', (req: Request, res: Response) => {
            self.controller.getPropertyRentMatrix(req, res);
        });
    }
}