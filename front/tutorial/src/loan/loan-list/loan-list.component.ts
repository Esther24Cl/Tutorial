import { Component, OnInit } from '@angular/core';
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
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoanItemComponent } from "./loan-item/loan-item.component";
import { Category } from '../../category/model/Category';

@Component({
  selector: 'app-loan-list',
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
    LoanItemComponent
],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit{
  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate','endDate', 'action'];

  loans: Loan[];
  games: Game[];
  clients: Client[];
  filterGame: Game | null = null;
  filterGameTitle: string | null = null;
  filterClient: Client | null = null;
  filterClientName: string | null = null;
  filterDate: Date | null = null;

  constructor(
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientsService,
    public dialog: MatDialog
  ){}
  
  ngOnInit(): void {
    this.loanService.getLoans().subscribe((loans) => (this.dataSource.data = loans));
    this.gameService.getGames().subscribe((games) => (this.games = games));
    this.clientService.getClients().subscribe((clients) => (this.clients = clients));
  }

  onCleanFilter(): void{
    this.filterGame = null;
    this.filterGameTitle = null;
    this.filterClient = null;
    this.filterClientName = null;
    this.filterDate = null;
    this.onSearch();
  }

  onSearch():void{
    const gameId = this.filterGame != null ? this.filterGame.id: null;
    const gameTitle = this.filterGameTitle;
    const clientId = this.filterClient != null ? this.filterClient.id: null;
    const clientTitle = this.filterClientName;
    const date = this.filterDate;

    this.loanService.getLoans().subscribe((loans) => (this.dataSource.data = loans));
    
  }

  createLoans(){
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editLoans(loan: Loan){
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: { loan: Loan },
    });

    dialogRef.afterClosed().subscribe((result) => {
        this.onSearch();
    });
  }

}
