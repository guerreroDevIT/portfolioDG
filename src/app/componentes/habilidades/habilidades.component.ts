import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Habilidades } from 'src/app/model/habilidades';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidadesList: any;
  miPortfolio: any;

  habili: Habilidades[] = [];

  // inicio 20230210
  objid: Habilidades = new Habilidades("--", "--", 0);
  objedit: Habilidades = new Habilidades("--", "--", 0);
  // FIN 20230210

  descripcionE: string = '';
  nombreE: string = '';
  porcentaje: number = 0;

  // inicio 20230210
  descripcionEM: string = '';
  nombreEM: string = '';
  porcentajeM: number = 0;
  // FIN 20230210


  constructor(private datosPortfolio: PortfolioService, private tokenService: TokenService, private router: Router, private sHabilidades: HabilidadesService) { }

  isLogged = false;
  ngOnInit(): void {

    this.cargarHabilidades()
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.habilidadesList=data.habilidades;
      this.miPortfolio = data;
    });


    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onCreate(): void {
    const habili = new Habilidades(this.nombreE, this.descripcionE, this.porcentaje);
    this.sHabilidades.save(habili).subscribe(
      data => {
        alert("Educación añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        // INICIO 20230210
        this.nombreE = "";
        this.descripcionE = "";
        this.porcentaje = 0;
        this.cargarHabilidades();
        // FIN 20230210

      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  // INICIO 20230210
  openUpdateForm(form: string, id?: number): void {

    if (id !== undefined) {
      this.sHabilidades.detail(id).subscribe(
      data =>{
        this.objid = data;
        this.nombreEM = data.nombreE;
        this.descripcionEM = data.descripcionE;
        this.porcentajeM = data.porcentaje;

        const element = document.getElementById(form);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }

      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
    }

  }

  onUpdate(id?: number): void{
   this.objedit = new Habilidades(this.nombreEM, this.descripcionEM, this.porcentajeM);
   if (id !== undefined) {
    this.sHabilidades.update(id, this.objedit).subscribe(
    data => {
      alert(`Educación actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarHabilidades();

    }, err => {
      alert(`Error al modificar la formación`);
      this.router.navigate(['']);
    }

  )
  }
  }
  // FIN 20230210

  cargarHabilidades(): void {
    this.sHabilidades.lista().subscribe(data => { this.habili = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sHabilidades.delete(id).subscribe(
        data => {
          this.cargarHabilidades();
        }, err => {
          alert("No se pudo borrar la información");
        }
      )
    }
  }


}
