interface _User{
    _id:string;
    nombre:string;
    img:string;
};

interface _Hospital{
    _id:string;
    nombre:string;
    img:string;
};

export class Doctor{
    constructor(
        public _id:string,
        public nombre:string,
        public hospital?:_Hospital,
        public user?:_User,
        public img?:string
    ){

    }
}