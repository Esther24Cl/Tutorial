import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Loan } from '../../model/loan';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-loan-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule],
  templateUrl: './loan-item.component.html',
  styleUrl: './loan-item.component.scss'
})
export class LoanItemComponent{
  @Input() loan= new MatTableDataSource<Loan>();
  // dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate','endDate', 'action'];
}
