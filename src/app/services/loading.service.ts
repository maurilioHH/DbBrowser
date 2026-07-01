import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LoadingService {
  // Usiamo i Signals di Angular, perfetti per le performance in Angular 19
  private loadingCount = 0;
  isLoading = signal<boolean>(false);

  show() {
    this.loadingCount++;
    this.isLoading.set(true);
  }

  hide() {
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      this.loadingCount = 0; // Sicurezza contro i numeri negativi
      this.isLoading.set(false);
    }
  }
}
