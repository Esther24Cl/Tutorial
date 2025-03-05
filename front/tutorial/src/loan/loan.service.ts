import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOAN_DATA } from './model/mock-loan';
import { Loan } from './model/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor() { }

  getLoans(): Observable<Loan[]>{
    return of(LOAN_DATA);
  }

  saveLoan(loan: Loan): Observable<void>{
    return of();
  }
}
