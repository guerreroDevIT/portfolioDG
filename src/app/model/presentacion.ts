export class Presentacion {
    id?: number;
    nombreE: string;
    descripcionE: string;
    ubicacionE: string;
    telefonoE: string;
    emailE: string;

    constructor(nombreE: string, descripcionE: string, ubicacionE: string, telefonoE: string, emailE: string){
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
        this.ubicacionE = ubicacionE;
        this.telefonoE = telefonoE;
        this.emailE = emailE;
    }
}
