import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Loan } from '../model/loan';
import { Game } from '../../game/model/Game';
import { Client } from '../../clients/model/Client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../../game/game.service';
import { LoanService } from '../loan.service';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-loan-edit',
  standalone:true,
  imports: [FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss'
})
export class LoanEditComponent implements OnInit{
  loan: Loan;
  games: Game[];
  clients: Client[];

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA)public data: {loan: Loan},
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
    this.loanService.saveLoan(this.loan).subscribe((result) => {
        this.dialogRef.close();
      });
  }

  onClose() {
      this.dialogRef.close();
  }
}