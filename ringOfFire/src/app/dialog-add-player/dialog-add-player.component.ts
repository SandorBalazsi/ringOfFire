import { Component, inject, model } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';




@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatFormFieldModule,MatIconModule, MatDialogActions, MatDialogContent, MatDialogClose, MatButtonModule, MatInputModule, FormsModule, MatDividerModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name:string = '';
  readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);
  readonly data = inject(MatDialog);


constructor(private dialog: MatDialog){}

onNoClick(){
this.dialogRef.close();
}
}
