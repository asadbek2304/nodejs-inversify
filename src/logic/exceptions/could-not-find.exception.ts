export class CouldNotFoundException extends Error {
    constructor(property: string){
        super(`No ${property} found with the given id`)
    }
}