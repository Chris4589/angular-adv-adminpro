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
}