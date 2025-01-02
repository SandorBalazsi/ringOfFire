import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ring-of-fire-2f714',
        appId: '1:53271698826:web:863123fda2875df37ffc73',
        storageBucket: 'ring-of-fire-2f714.firebasestorage.app',
        apiKey: 'AIzaSyB30D3n_XAGv0L_B3X8zOO4b0hCRkdH7MI',
        authDomain: 'ring-of-fire-2f714.firebaseapp.com',
        messagingSenderId: '53271698826',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};