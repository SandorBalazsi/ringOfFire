import { AsyncPipe, CommonModule} from '@angular/common';
import { Component, inject} from '@angular/core';
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
import { Firestore, addDoc, collection, collectionData, doc, docData, docSnapshots, documentId, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ProfileComponent, MatDividerModule, MatIconModule, MatButtonModule, MatInputModule, DialogAddPlayerComponent, FormsModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent{

   
    game: Game = new Game();
    gameId:string |null = null;;
    firestore: Firestore =inject(Firestore);
    items$: Observable<any[]>;


constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router){
  const aCollection = collection(this.firestore, 'items')
  this.items$ = collectionData(aCollection);
}

  ngOnInit(): void {
    console.log('ngOninit called');
      
      this.gameId = this.route.snapshot.paramMap.get('id');

        if(this.gameId){
          const gameDocRef = doc(this.firestore, 'games', this.gameId);

        docSnapshots(gameDocRef).subscribe((snapshot) => {
          if (snapshot.exists()) {
            const gameData = snapshot.data() as Game;
            console.log('Game update:', gameData);
  
            this.game.currentPlayer = gameData.currentPlayer;
            this.game.playedCards = gameData.playedCards;
            this.game.players = gameData.players
            this.game.stack = gameData.stack;
            this.game.pickCardAnimation = gameData.pickCardAnimation;
            this.game.currentCard = gameData.currentCard;
          } else {
            console.error('No such document!')
          }
        })
        }
  }

  async newGame(){
    
    this.game = new Game();
    console.log('newGame :',this.game)

    
  }

  takeCard(){
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game?.stack.pop() as string;
      this.game.pickCardAnimation = true;
      console.log(''+ this.game.currentCard);
      console.log(this.game);
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();

    setTimeout(()=>{

      this.game?.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.updateGame();
  
    }, 1000);
    }
  }

  openDialog(): void {

    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){
      this.game?.players.push(name);

      this.updateGame();
    }
    });
  }

  updateGame(){
    if (this.gameId){
      const aDoc = doc(this.firestore, 'games', this.gameId);
      setDoc(aDoc, { ...this.game });
      console.log('Game updated successfully')
    }
    
  }

}





