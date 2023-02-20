import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Acercade } from 'src/app/model/acercade';
import { AcercadeService } from 'src/app/servicios/acercade.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acerca-de-mi',
  templateUrl: './acerca-de-mi.component.html',
  styleUrls: ['./acerca-de-mi.component.css']
})
export class AcercaDeMiComponent implements OnInit {

  acer: Acercade[] = [];

  // inicio 20230210
  acerc: Acercade = new Acercade("--");
  acercc: Acercade = new Acercade("--");
  // FIN 20230210



  nombreE: string = '';

  // inicio 20230210
  nombreEM: string = '';
  // FIN 20230210








  miPortfolio: any;



  constructor(private datosPortfolio: PortfolioService, private sAcercade: AcercadeService, private tokenService: TokenService, private router: Router) { }


  isLogged = false;
  ngOnInit(): void {

    this.cargarAcercade();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.miPortfolio = data;
    });
  }

  onCreate(): void {
    const acer = new Acercade(this.nombreE);
    this.sAcercade.save(acer).subscribe(
      data => {
        alert("Información añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        // INICIO 20230210
        this.nombreE = "";
        this.cargarAcercade();
        // FIN 20230210

      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  // INICIO 20230210
  openUpdateForm(form: string, id?: number): void {

    if (id != undefined) {
      this.sAcercade.detail(id).subscribe(
      data =>{
        this.acerc = data;
        this.nombreEM = data.nombreE;

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
   this.acercc = new Acercade(this.nombreEM);
   if (id !== undefined) {
    this.sAcercade.update(id, this.acercc ).subscribe(
    data => {
      alert(`Información actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarAcercade();

    }, err => {
      alert(`Error al modificar la información`);
      this.router.navigate(['']);
    }

  )
   }


  }
  // FIN 20230210

  cargarAcercade(): void {
    this.sAcercade.lista().subscribe(data => { this.acer = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sAcercade.delete(id).subscribe(
        data => {
          this.cargarAcercade();
        }, err => {
          alert("No se pudo borrar la información");
        }
      )
    }
  }

}
