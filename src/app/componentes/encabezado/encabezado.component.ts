import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Presentacion } from 'src/app/model/presentacion';
import { PresentacionService } from 'src/app/servicios/presentacion.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  miPortfolio:any;
  isLogged = false;

  prese: Presentacion[] = [];

  // inicio 20230210
  presen: Presentacion = new Presentacion("--", "--", "--", "--", "--");
  present: Presentacion = new Presentacion("--", "--", "--", "--", "--");
  // FIN 20230210

  descripcionE: string = '';
  nombreE: string = '';
  ubicacionE: string = '';
  telefonoE: string = '';
  emailE: string = 'emailto: ';

  // inicio 20230210
  descripcionEM: string = '';
  nombreEM: string = '';
  ubicacionEM: string = '';
  telefonoEM: string = '';
  emailEM: string = 'emailto: ';
  // FIN 20230210

  constructor(private datosPortfolio:PortfolioService, private sPresentacion: PresentacionService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {

    this.cargarPresentacion()
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    };

    this.datosPortfolio.obtenerDatos().subscribe(data =>{

      this.miPortfolio=data;
    })
  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/iniciar-sesion'])
  }


  onCreate(): void {
    const prese = new Presentacion(this.nombreE, this.descripcionE, this.ubicacionE, this.telefonoE, this.emailE);
    this.sPresentacion.save(prese).subscribe(
      data => {
        alert("Información añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        // INICIO 20230210
        this.nombreE = "";
        this.descripcionE = "";
        this.ubicacionE = "";
        this.telefonoE = "";
        this.emailE = "emailto: ";
        this.cargarPresentacion();
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
      this.sPresentacion.detail(id).subscribe(
      data =>{
        this.presen = data;
        this.nombreEM = data.nombreE;
        this.descripcionEM = data.descripcionE;
        this.ubicacionEM = data.ubicacionE;
        this.telefonoEM = data.telefonoE;
        this.emailEM = data.emailE;

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
   this.present = new Presentacion(this.nombreEM, this.descripcionEM, this.ubicacionEM, this.telefonoEM, this.emailEM);
   if (id !== undefined) {
    this.sPresentacion.update(id, this.present).subscribe(
    data => {
      alert(`Presentación actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarPresentacion();

    }, err => {
      alert(`Error al modificar la Presentación`);
      this.router.navigate(['']);
    }

  )
  }
  }
  // FIN 20230210

  cargarPresentacion(): void {
    this.sPresentacion.lista().subscribe(data => { this.prese = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sPresentacion.delete(id).subscribe(
        data => {
          this.cargarPresentacion();
        }, err => {
          alert("No se pudo borrar la información");
        }
      )
    }
  }
}
