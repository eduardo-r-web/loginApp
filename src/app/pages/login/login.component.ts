import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  constructor( private auth: AuthService ) { 
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {}

  login( form: NgForm){
    if(form.valid){
      Swal.fire({
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      
      this.auth.login(this.usuario)
        .subscribe( resp => {
          console.log(resp);
          Swal.close();
        }, (err) => {
          console.log(err['error'].error.message);
          Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err['error'].error.message
      });
        });
    }
  }
}
