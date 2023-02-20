import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  educacionList: any;
  miPortfolio: any;

  educ: Educacion[] = [];

  // inicio 20230210
  objid: Educacion = new Educacion("--", "--");
  objedit: Educacion = new Educacion("--", "--");
  // FIN 20230210


  descripcionE: string = '';
  nombreE: string = '';

  // inicio 20230210
  descripcionEM: string = '';
  nombreEM: string = '';
  // FIN 20230210

  constructor(private datosPortfolio: PortfolioService, private tokenService: TokenService, private router: Router, private sEducacion: EducacionService) { }
  isLogged = false;
  ngOnInit(): void {

    this.cargarEducacion()
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.miPortfolio = data.formacion;
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


  onCreate(): void {
    const educ = new Educacion(this.nombreE, this.descripcionE);
    this.sEducacion.save(educ).subscribe(
      data => {
        alert("Educación añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        // INICIO 20230210
        this.nombreE = "";
        this.descripcionE = "";
        this.cargarEducacion();
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
      this.sEducacion.detail(id).subscribe(
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
   this.objedit = new Educacion(this.nombreEM, this.descripcionEM);
   if (id !== undefined) {
    this.sEducacion.update(id, this.objedit).subscribe(
    data => {
      alert(`Formación actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarEducacion();

    }, err => {
      alert(`Error al modificar la formación`);
      this.router.navigate(['']);
    }

  )
  }
  }
  // FIN 20230210

  cargarEducacion(): void {
    this.sEducacion.lista().subscribe(data => { this.educ = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sEducacion.delete(id).subscribe(
        data => {
          this.cargarEducacion();
        }, err => {
          alert("No se pudo borrar la información");
        }
      )
    }
  }

}
