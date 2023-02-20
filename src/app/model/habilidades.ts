export class Habilidades {
    id?: number;
    nombreE: string;
    descripcionE: string;
    porcentaje: number;

    constructor(nombreE: string, descripcionE: string, porcentaje: number){
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
        this.porcentaje = porcentaje;
    }
}
