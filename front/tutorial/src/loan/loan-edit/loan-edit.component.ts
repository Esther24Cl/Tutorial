import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GameItemComponent } from '../../game/game-list/game-item/game-item.component';
import { Game } from '../../game/model/Game';
import { Client } from '../../clients/model/Client';
import { Loan } from '../model/loan';
import { LoanService } from '../loan.service';
import { ClientsService } from '../../clients/clients.service';
import { GameService } from '../../game/game.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { differenceInDays, parseISO } from 'date-fns';

@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ], providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss'
})
export class LoanEditComponent implements OnInit{
  loan: Loan;
  games: Game[];
  clients: Client[];
  startDate: Date;
  endDate: Date;
  stringStartDate: String;
  stringEndDate: String;

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {loan: Loan},
    private gameService: GameService,
    private loanService: LoanService,
    private clientService: ClientsService,
  ){}

  ngOnInit(): void {
    this.loan = new Loan();
    
    this.gameService.getGames().subscribe((games) => (this.games = games));
    this.clientService.getClients().subscribe((clients) => (this.clients = clients));
   }

  onSave() {
    if (this.endDate < this.startDate) {
      alert('La fecha de fin no puede ser anterior a la fecha de inicio.');
      return;
    }
    
    if(differenceInDays(this.endDate, this.startDate) > 14) {
      alert('El periodo de préstamo puede ser hasta 14 días.');
      return;
    }
    
    this.loan.endDate = this.endDate;
    this.loan.startDate = this.startDate;

    this.loanService.saveLoan(this.loan).subscribe((result) => {
          this.dialogRef.close();
    });
  }

  onClose() {
      this.dialogRef.close();
  }
}