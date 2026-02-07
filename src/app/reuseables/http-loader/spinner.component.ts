import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderService } from './loader.service';
import { Observable, of} from 'rxjs';

// <div class="spinner"></div>
// <div *ngIf="isLoading | async" class="spinner-overlay"> <div class="spinner"></div> </div>
@Component({
  selector: 'app-spinner',
  imports: [ CommonModule],

  template: `
    <div *ngIf="isLoading | async" class="spinner-overlay">

      <div class="logo-container">
          <img src="assets/images/logo.png" alt="App Logo" class="logo-bounce" />
        </div>
    </div>
  `,
  styles: [`

    .spinner-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.35);
      z-index: 1000;
    }

    /* Container */
    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Logo size + animation */
    .logo-bounce {
      width: 90px;              /* reduced width */
      max-width: 40vw;
      animation: logoBounce 1.2s ease-in-out infinite;
    }

    /* Bounce animation */
    @keyframes logoBounce {
      0%, 100% {
        transform: translateY(0) scale(1);
      }
      50% {
        transform: translateY(-18px) scale(1.05);
      }
    }

    @media (max-width: 480px) {
      .logo-bounce {
        width: 70px;
      }
    }


  `]
})
export class SpinnerComponent {
    isLoading: Observable<boolean>;
   constructor(private loaderService: LoaderService) {
     this.isLoading = this.loaderService.loading$; // ✅ safe
   }

}
