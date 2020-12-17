import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class User {
    
    constructor(
        public role:string, 
        public nombre:string,
        public email:string, 
        public _id?:string,
        public google?:boolean, 
        public img?:string,
        public password?:string
    ){
        
    }

    get ImagEn(){
        if(this.img)
        {
            if(this.img.includes('http'))
                return this.img;
            else
                return `${base_url}/upload/?collection=users&file=${this.img}`;
        }
        else
            return `${base_url}/upload/?collection=doctors&file=no-img`;
    }
}