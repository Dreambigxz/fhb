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

      this.notifications = this.quickNav.storeData.get('notification').unseen || [];
      if (this.notifications.length) {
        this.currentIndex = 0;
        this.timer = setTimeout(() =>{this.showNotifications = true; this.showNextNotification()}, 3000);      }
  }

  saveUnreadNoti() {
    if(!this.quickNav.storeData.get('total_read'))return
    this.quickNav.reqServerData.post('notifications/?hideSpinner', {total_read:this.quickNav.storeData.get('total_read'),processor:'save_read'}).subscribe((res)=>{
    this.quickNav.storeData.set('total_read',0)
  })}

  showNextNotification() {

    // console.log('show noti><<');


    const noti = this.quickNav.storeData.get('notification')
    // if (!noti.seen) {
    //   noti.seen= [ ]
    // };
    if (!this.quickNav.storeData.has('total_read')) {
      this.quickNav.storeData.set('total_read',0)
    }

    if (!this.notifications.length) {this.close();return};
    this.currentNotification = this.notifications[this.currentIndex];

    // this.quickNav.storeData.get('notification').unseen.pop(this.currentIndex)
    let read = noti.unseen.pop(this.currentIndex)//this.quickNav.storeData.get('notification').unseen.pop(this.currentIndex)
    // noti.seen.push(read)

    // console.log({noti});
    // console.log('total_read>>', this.quickNav.storeData.store['total_read']);

    this.quickNav.storeData.store['total_read']+=1
    this.currentIndex = (this.currentIndex + 1) % this.notifications.length;

    this.timer = setTimeout(() => this.showNextNotification(), 20000);
  }

  readNext(){
    clearTimeout(this.timer)
    this.showNextNotification()
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
