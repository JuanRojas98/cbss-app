import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

}
