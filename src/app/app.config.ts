import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PostHttpInterceptor } from './reuseables/http-loader/post-http.interceptor';
import { provideHttpClient,withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(),
    provideHttpClient(withInterceptors([PostHttpInterceptor])),

   ]
};
