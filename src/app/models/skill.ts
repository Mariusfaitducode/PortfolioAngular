export class Skill {

    id : number = 0;

    title: string = "";

    category: string = "";

    image: string = "";

    constructor(data : any){

        this.id = data.id;

        this.title = data.attributes.title;
        this.category = data.attributes.category;
        this.image = data.attributes.url.data[0].attributes.url;
    }
}
