import { Component, HostListener, inject } from '@angular/core';

import { Router, NavigationEnd,NavigationStart, RouterOutlet } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { QuickNavService } from './reuseables/services/quick-nav.service';
import { AppDownloadManager } from './reuseables/services/app-download-manager.service';

import {  loadScript , loadExternalScript} from './reuseables/helper';

import { SwUpdate } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

import { AuthService } from './reuseables/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pheonix FB';

  quickNav = inject(QuickNavService);
  // appManager = inject(AppDownloadManager)
  authService = inject(AuthService)

  private swUpdate = inject(SwUpdate);

  updateAvailable = false;
  private swRegistration: ServiceWorkerRegistration | null = null;

  constructor(private router: Router,private appManager: AppDownloadManager) {


    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // Find the last navigation event to check trigger type
        const nav = this.router.getCurrentNavigation();
        const segments = window.location.pathname.split('/');
        const activePage = segments.pop() || '';

        if (nav?.trigger !== 'popstate') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (["login","register","reset"].includes(activePage)&&this.authService.checkLogin()) {
          this.authService.router.navigate(['/']); // or '/dashboard'
        }

        // this.appManager.showDownload();
        loadExternalScript()

        let total_read = this.quickNav.storeData.get('total_read')

        if (this.quickNav.storeData.get('total_read')) {
          this.quickNav.reqServerData.post('notifications/?hideSpinner', {total_read:this.quickNav.storeData.get('total_read'),processor:'save_read'}).subscribe()
        }

      });


  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: BeforeUnloadEvent) {
    // Prevent default reload/close
    if (this.quickNav.storeData.get('total_read')) {
      this.quickNav.reqServerData.post('notifications/?hideSpinner', {total_read:this.quickNav.storeData.get('total_read'),processor:'save_read'}).subscribe()
    }
    // event.preventDefault();

    // Standard-compliant browsers ignore the returned string,
    // but this is needed for Chrome/Edge/Firefox to trigger the warning dialog
    event.returnValue = '';

    // Optionally, do something before reload:
    // console.log('User is about to reload or close the page!');
  }

  doRefresh(event: any) {
    window.location.reload(); // Full reload

    // OR soft reload data
    // this.loadData();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }


}
