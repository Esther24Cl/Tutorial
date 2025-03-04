import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/client';
import { CLIENT_DATA } from './model/mock-clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }

  getClients(): Observable<Client[]>{
    return of(CLIENT_DATA);
  }

  saveClients(client: Client): Observable<Client[]>{
    return new Observable();
  }

  deleteClient(idClient: number):Observable<any>{
    return new Observable();
  }
  
}
