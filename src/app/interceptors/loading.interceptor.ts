import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Mostra il loading all'avvio della richiesta
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Nasconde il loading quando la richiesta si completa o fallisce
      loadingService.hide();
    })
  );
};