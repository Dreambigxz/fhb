import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { QuickNavService } from '../../reuseables/services/quick-nav.service';
import { MomentAgoPipe } from '../../reuseables/pipes/moment.pipe';

@Component({
  selector: 'app-quick-notifications',
  standalone: true,
  imports: [CommonModule, MomentAgoPipe],
  templateUrl: './quick-notifications.component.html',
  styleUrls: ['./quick-notifications.component.css']
})
export class QuickNotificationsComponent implements OnInit, OnDestroy {
  quickNav = inject(QuickNavService);
  router = inject(Router);

  notifications: any[] = [];
  showNotifications = false;
  currentNotification: any;
  currentNotificationHeader: any;
  currentIndex = 0;
  total_read = 0
  private timer: any;

  ngOnInit() {

    const segments = window.location.pathname.split('/');
    const activePage = segments.pop() || '';

    // if (!this.quickNav.storeData.get('notification')) {
    //   this.quickNav.storeData.set('total_read',0)
    //   this.quickNav.reqServerData.get('notifications?hideSpinner&type=unseen&dir='+activePage).subscribe({
    //     next: (res) => {
    //       this.notifications = this.quickNav.storeData.get('notification').unseen || [];
    //       if (this.notifications.length) {
    //         this.timer = setTimeout(() =>{this.showNotifications = true; this.showNextNotification()}, 2000);
    //       }
    //     }
    //   });
    // }
    // else {
      console.log('storeData>>EXIST', this.quickNav.storeData);

      this.notifications = this.quickNav.storeData.get('notification').unseen || [];
      if (this.notifications.length) {
        this.currentIndex = 0;
        this.timer = setTimeout(() =>{this.showNotifications = true; this.showNextNotification()}, 5000);      }
    // }

  }

  saveUnreadNoti() {
    if(!this.quickNav.storeData.get('total_read'))return
    this.quickNav.reqServerData.post('notifications/?hideSpinner', {total_read:this.quickNav.storeData.get('total_read'),processor:'save_read'}).subscribe((res)=>{
    this.quickNav.storeData.set('total_read',0)
  })}

  showNextNotification() {
    if (!this.notifications.length) {this.close();return};
    this.currentNotification = this.notifications[this.currentIndex];

    this.quickNav.storeData.get('notification').unseen.pop(this.currentIndex)
    this.quickNav.storeData.store['total_read']+=1
    this.currentIndex = (this.currentIndex + 1) % this.notifications.length;

    this.timer = setTimeout(() => this.showNextNotification(), 6000);
  }

  close() {
    this.saveUnreadNoti();
    this.notifications = [];
    this.showNotifications=false
    if (this.timer) clearTimeout(this.timer);
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }
}
