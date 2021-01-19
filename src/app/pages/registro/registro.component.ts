import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'eduardorodriguez257@gmail.com';
   }

   onSubmit( form: NgForm ){
     if(form.valid){
      
      this.auth.NuevoUsuario(this.usuario)
        .subscribe( resp => {
          console.log(resp);
        }, (err) => {
          console.log(err['error'].error.message);
        });
     }
     
   }

}
