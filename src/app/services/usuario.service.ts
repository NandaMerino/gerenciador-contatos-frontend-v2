import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/usuario"

  constructor() { }

  listAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API+"/listAll");
  }

  save(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.API+"/save", usuario, {responseType: 'text' as 'json'} );
  }

  update(usuario: Usuario): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+usuario.id, usuario, {responseType: 'text' as 'json'} );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.API+"/findById/"+id );
  }

}
