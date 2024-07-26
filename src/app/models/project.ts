import { Skill } from "./skill";

export class Project {

    id: number = 0;

    title: string = "";
    smallDescription: string = "";
    smallDescriptionEn: string = "";

    githubUrl: string = "";
    linkUrl: string = "";

    teamProject: boolean = false;
    visible: boolean = false;
    bigProject: boolean = false;

    category: string = "";

    skills: Skill[] = [];
    images: string[] = [];

    constructor(data : any){

        this.id = data.id;

        this.title = data.attributes.title;
        this.smallDescription = data.attributes.smallDescription;
        this.smallDescriptionEn = data.attributes.smallDescriptionEn;
        this.githubUrl = data.attributes.githubUrl;
        this.linkUrl = data.attributes.linkUrl; 
        this.teamProject = data.attributes.teamProject;
        this.visible = data.attributes.visible;
        this.bigProject = data.attributes.bigProject;
        this.category = data.attributes.category;

        // this.skills = data.attributes.skills.map((skill: any) => new Skill(skill));

        this.images = data.attributes.images.data.map((image: any) => image.attributes.url);
    }

    // setSkills(skills: Skill[]){
    //     this.skills = skills;
    // }
}
