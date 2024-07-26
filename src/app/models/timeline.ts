export class Timeline {

    title: string;
    description: string;
    type: string;
    logo?: string;
    startDate: string;
    endDate: string;
    
    constructor(data: any){

        this.title = data.attributes.title;
        this.description = data.attributes.description;
        this.type = data.attributes.type;
        this.startDate = data.attributes.startDate;
        this.endDate = data.attributes.endDate;

        if (data.attributes.logo.data){
            this.logo = data.attributes.logo.data[0].attributes.url;

        }

    }
}