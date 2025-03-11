import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOAN_DATA } from './model/mock-loan';
import { Loan } from './model/loan';
import { Pageable } from '../core/model/page/Pageable';
import { LoanPage } from './model/LoanPage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/loan';

  getLoans(pageable: Pageable, filter: any): Observable<LoanPage>{

    return this.http.post<LoanPage>(this.composeFindUrl(pageable, filter), {pageable, filter});
  }

  saveLoan(loan: Loan): Observable<Loan>{
    return this.http.put<Loan>(this.baseUrl, loan);
  }

  deleteAuthor(idLoan: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
  }

  private composeFindUrl(pageable: Pageable, filters: any): string {
    const params = new URLSearchParams();
    
    if (filters.gameTitle) {
      params.set('gameTitle', filters.gameTitle.title);
    }
    if (filters.clientName) {
      params.set('clientName', filters.clientName.name);
    }
    if (filters.date) {
      params.set('date', filters.date.toString());
    }
    
    const queryString = params.toString();
    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }
}
