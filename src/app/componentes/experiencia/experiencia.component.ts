import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/servicios/s-experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList: any;


  expe: Experiencia[] = [];

  // inicio 20230210
  objid: Experiencia = new Experiencia("--", "--");
  objedit: Experiencia = new Experiencia("--", "--");
  // FIN 20230210

  descripcionE: string = '';
  nombreE: string = '';

  // inicio 20230210
  descripcionEM: string = '';
  nombreEM: string = '';
  // FIN 20230210


  miPortfolio: any;
  isLogged = false;
  constructor(private datosPortfolio: PortfolioService, private tokenService: TokenService, private router: Router, private sExperiencia: SExperienciaService) {}

  ngOnInit(): void {

    this.cargarExperiencia()
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.experienciaList=data.experience;
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


  onCreate(): void {
    const expe = new Experiencia(this.nombreE, this.descripcionE);
    this.sExperiencia.save(expe).subscribe(
      data => {
        alert("Experiencia añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        // INICIO 20230210
        this.nombreE = "";
        this.descripcionE = "";
        this.cargarExperiencia();
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
      this.sExperiencia.detail(id).subscribe(
      data =>{
        this.objid = data;
        this.nombreEM = data.nombreE;
        this.descripcionEM = data.descripcionE;

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
   this.objedit = new Experiencia(this.nombreEM, this.descripcionEM);
   if (id !== undefined) {
    this.sExperiencia.update(id, this.objedit).subscribe(
    data => {
      alert(`Experiencia actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarExperiencia();

    }, err => {
      alert(`Error al modificar la experiencia`);
      this.router.navigate(['']);
    }

  )
  }
  }
  // FIN 20230210

  cargarExperiencia(): void {
    this.sExperiencia.lista().subscribe(data => { this.expe = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sExperiencia.delete(id).subscribe(
        data => {
          this.cargarExperiencia();
        }, err => {
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }

}
