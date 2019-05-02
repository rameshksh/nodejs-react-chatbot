
var request = require('request');

export class PropertyService {
    private baseApiUrl: string = "http://api.myleasestar.com/v2/";

    public constructor() { }

    public getProperties(callback: (item: any, error: Error) => any) {
        console.log('Inside service....');

        request.get(this.baseApiUrl + 'property', (error, response, body) => {
            // A chunk of data has been recieved.
            let obj = JSON.parse(body);
            callback(obj, error);

        }).on("error", (err) => {
            callback(null, err);
        });
    }

    public getPropertyDetails(pId: string, callback: (item: any, error: Error) => any) {
        const url = this.baseApiUrl + 'property/' + pId + '/summary';

        request.get(url, (error, response, body) => {
            let obj = JSON.parse(body);
            callback(obj, error);
        }).on("error", (err) => {
            callback(null, err);
        });
    }

    public getPropertyUnits(propertyId: string, callback: (item: any, error: Error) => any) {
        console.log('Inside service....');

        request.get(this.baseApiUrl + 'property/' + propertyId + '/units', (error, response, body) => {
            let obj = JSON.parse(body);
            callback(obj, error);
        }).on("error", (err) => {
            callback(null, err);
        });
    }

    public getPropertyFloorplan(propertyId: string, callback: (item: any, error: Error) => any) {
        request.get(this.baseApiUrl + 'property/' + propertyId + '/floorplans', (error, response, body) => {
            let obj = JSON.parse(body);
            callback(obj, error);
        }).on("error", (err) => {
            callback(null, err);
        });
    }

    public getPropertyRentMatrix(unitId, callback: (errr: Error, item: any) => any) {
        console.log('Inside service....');
        var url = "http://api.pv1.myleasestar.com/v2/unit/{unitId}/rent-matrix?version=2013&neededbydate=2014-08-06&leaseterm=12"

        request.get(url.replace('{unitId}', unitId), (error, response, body) => {
            // A chunk of data has been recieved.
            let obj = JSON.parse(body);

            callback(obj, error);

        }).on("error", (err) => {
            callback(null, err);
        });
    }

    public postServiceRequest(callback: (errr: Error, item: any) => any) {
        const url = '';
        const body = {};

        request.post(url, body, (error, response, body) => {
            // A chunk of data has been recieved.
            let obj = JSON.parse(body);

            callback(obj, error);

        }).on("error", (err) => {
            callback(null, err);
        });
    }
}


