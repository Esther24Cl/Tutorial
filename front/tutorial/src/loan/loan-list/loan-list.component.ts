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
import { Category } from '../../category/model/Category';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { format, toZonedTime } from 'date-fns-tz';


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
    MatPaginator,
],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit{
  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate','endDate', 'action'];
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  timeZone = 'Europe/Madrid';

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
    public dialog: MatDialog,
  ){}
  
  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent){
   
    const { pageable, filters } = this.buildPageableAndFilters(event);

    this.loanService.getLoans(pageable, filters).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

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
    
    const { pageable, filters } = this.buildPageableAndFilters();

    this.loanService.getLoans(pageable, filters).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
    
  }

  buildPageableAndFilters(event?: PageEvent): {pageable: Pageable, filters: any } {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort:[
        {
          property: 'id',
          direction: 'ASC',
        }
      ]
    };
    
    if(event != null){
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    const filters = {
      gameId: this.filterGame != null ? this.filterGame.id: null,
      gameTitle: this.filterGameTitle,
      clientId: this.filterClient != null ? this.filterClient.id: null,
      clientName: this.filterClientName,
      date: this.filterDate ? format(this.filterDate, 'yyyy-MM-dd', { timeZone: this.timeZone }) : null,
    };

    return { pageable, filters };

  }

  createLoans(){
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteAuthor(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: {
            title: 'Eliminar préstamo',
            description:
                'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
        },
    });

    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.loanService.deleteAuthor(loan.id).subscribe((result) => {
                this.ngOnInit();
            });
        }
    });
  }

  handleDateChange(date: Date) {
    const zonedDate = toZonedTime(date, this.timeZone);
    const formattedDate = format(zonedDate, 'yyyy-MM-dd');
    console.log(formattedDate); // Debería mostrar la fecha correcta
    this.filterDate = zonedDate; // Actualiza la fecha en tu componente
  }  

}
