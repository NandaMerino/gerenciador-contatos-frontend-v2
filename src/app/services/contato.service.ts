import { inject, Injectable } from '@angular/core';
import { Contato } from '../models/contato';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  http = inject(HttpClient);
  
    API = "http://localhost:8080/api/contato"

  constructor() { }

  listAll(): Observable<Contato[]>{
      return this.http.get<Contato[]>(this.API+"/listAll");
    }
  
    save(contato: Contato): Observable<string> {
      return this.http.post<string>(this.API+"/save", contato, {responseType: 'text' as 'json'} );
    }
  
    update(contato: Contato): Observable<string> {
      return this.http.put<string>(this.API+"/update/"+contato.id, contato, {responseType: 'text' as 'json'} );
    }
  
    delete(id: number): Observable<string> {
      return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
    }
  
    findById(id: number): Observable<Contato> {
      return this.http.get<Contato>(this.API+"/findById/"+id );
    }

    findByTrechoNome(busca: string): Observable<Contato[]> {
      const params = new HttpParams().set('nome', busca); // Define o parâmetro da consulta
      return this.http.get<Contato[]>(this.API + "/findByTrechoNome", { params }); // Envia o parâmetro para o backend
    }
}
