import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyAZnizTo9G_5EPpEbhxLb7K-cHlC5oNiHk';
  userToken:string;

  //crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login 
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) { 
  }

  logout(){

  }

  login( usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
    .pipe( map( (resp) => {
      this.guardarToken( resp['idToken'] );
      return resp;
    }));
  }

  NuevoUsuario( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData)
    .pipe( map( (resp) => {
      this.guardarToken( resp['idToken'] );
      return resp;
    }));
  }

  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );
  }

  leerToken(  ){
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else {
      this.userToken = '';
    }
  }
}
