export class Weather {
    public currently: Currently;
    public timezone : string;
    public daily : any;
    public latitude : string;
    public longitude : string;
}

export class Currently {
    humidity: number;
    pressure: number;
    summary: string;
    temperature: string;
    windSpeed: number;
}