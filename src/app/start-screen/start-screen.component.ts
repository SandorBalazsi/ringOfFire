import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  game: Game = new Game();

  constructor(private router: Router, private firestore: Firestore){
    
  }

  async newGame(): Promise<void>{

    const gamesCollection = collection(this.firestore, 'games');
    const docRef = await addDoc(gamesCollection, {...this.game});
    console.log('Game created with ID:', docRef.id)

    this.router.navigateByUrl('/game/' + docRef.id)

  }
}
