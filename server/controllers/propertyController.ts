import { Express, Request, Response } from "express";
import { PropertyService } from '../services/propertyService';
import { Result } from '../models/result';

export class PropertyController {
    public result: Result;
    public service: PropertyService;

    public constructor(service: PropertyService) {
        this.result = new Result();
        this.service = service;
    }

    public getPropertySummary(req: Request, res: Response) {

        let pid = req.params.id;

        if (pid) {
            this.service.getPropertyDetails(pid, (err, item) => {

                if (err) {                   
                    return res.json(err);
                }

                return res.json(item);
            });
        } else {
            return res.json("Coordinates Missing");
        }
    }

    public getPropertyUnits(req: Request, res: Response) {

        let pid = req.params.id;

        if (pid) {
            this.service.getPropertyUnits(pid, (err, item) => {

                if (err) {                    
                    return res.json(err);
                }

                return res.json(item);
            });
        } else {
            return res.json("Coordinates Missing");
        }
    }


    public getPropertyFloorplans(req: Request, res: Response) {

        let pid = req.params.id;

        if (pid) {
            this.service.getPropertyFloorplan(pid, (err, item) => {

                if (err) {                 
                    return res.json(err);
                }

                return res.json(item);
            });
        } else {
            return res.json("Coordinates Missing");
        }
    }

    public getPropertyRentMatrix(req: Request, res: Response) {

        let pid = req.params.id;

        if (pid) {
            this.service.getPropertyRentMatrix(pid, (err, item) => {

                if (err) {                    
                    return res.json(err);
                }

                return res.json(item);
            });
        } else {
            return res.json("Coordinates Missing");
        }
    }
}  