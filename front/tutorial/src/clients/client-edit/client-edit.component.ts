import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../model/Client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client-edit',
  imports: [FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})

export class ClientEditComponent implements OnInit{
  
  client: Client;
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {client: Client},
    private clientsService: ClientsService,
  ){}
  
  ngOnInit(): void {
    this.client = this.data.client ? Object.assign({}, this.data.client) : new Client();
  }

  onSave(){
    this.clientsService.saveClients(this.client).subscribe(
       () => {
        this.dialogRef.close();
       },
       error => {
        this.errorMessage = error;
        alert(this.errorMessage);
    });
  }

  onClose(){
    this.dialogRef.close();
  }

}
