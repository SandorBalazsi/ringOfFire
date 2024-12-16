import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { ProfileComponent } from "../profile/profile.component";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { GameInfoComponent } from "../game-info/game-info.component";




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, ProfileComponent, MatDividerModule, MatIconModule, MatButtonModule, MatInputModule, DialogAddPlayerComponent, FormsModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent{

    currentCard = '';
    pickCardAnimation = false;
    game!: Game;

constructor(public dialog: MatDialog){
  this.newGame();
}

  takeCard(){
    if (!this.pickCardAnimation) {
      this.currentCard = this.game?.stack.pop() as string;
      this.pickCardAnimation = true;

      console.log(''+ this.currentCard);
      console.log(this.game);
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    setTimeout(()=>{
      this.pickCardAnimation = false;
      this.game?.playedCards.push(this.currentCard);
    }, 1000);
    }
  }

  newGame(){
    this.game = new Game;
    console.log(this.game);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){
      this.game?.players.push(name);
    }
    });
  }

}





