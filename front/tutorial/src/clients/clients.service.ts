import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Client } from './model/Client';
import { CLIENT_DATA } from './model/mock-clients';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
    return this.http.put<Client>(url, client).pipe(
      catchError((error: HttpErrorResponse) => {
            let errorMessage = `Error: ${error.error.message}`;
           return throwError(errorMessage);
      })
    );
  }

  deleteClient(idClient: number):Observable<any>{
    return this.http.delete<Client>(`${this.baseUrl}/${idClient}`);
  }
  
}
