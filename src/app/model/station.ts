export class Station  {
    stationId : number;
	city: string;
	campusLocation : string;
    
    constructor(stationId: number, city: string, campusLocation: string) {
        this.stationId = stationId;
        this.campusLocation = campusLocation;
        this.city = city;
    }
	
}