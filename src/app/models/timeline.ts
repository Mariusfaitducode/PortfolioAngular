export class Timeline {

    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    
    type: string;
    logo?: string;

    startDate: string;
    startDateEn: string;
    endDate: string;
    endDateEn: string;
    
    constructor(data: any){

        this.title = data.attributes.title;
        this.titleEn = data.attributes.titleEn;
        this.description = data.attributes.description;
        this.descriptionEn = data.attributes.descriptionEn;
        this.type = data.attributes.type;

        this.startDate = data.attributes.startDate;
        this.startDateEn = data.attributes.startDate;

        this.endDate = data.attributes.endDate;
        this.endDateEn = data.attributes.endDate;

        if (data.attributes.logo.data){
            this.logo = data.attributes.logo.data[0].attributes.url;

        }

    }
}
