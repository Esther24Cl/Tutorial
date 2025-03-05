import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/client';
import { CLIENT_DATA } from './model/mock-clients';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/client'

  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl);
  }

  saveClients(client: Client): Observable<Client>{
    const {id} = client;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Client>(url, client);
  }

  deleteClient(idClient: number):Observable<any>{
    return this.http.delete<Client>(`${this.baseUrl}/${idClient}`);
  }
  
}
