import { Component , inject} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestDataService } from '../reuseables/http-loader/request-data.service';
import { StoreDataService } from '../reuseables/http-loader/store-data.service';
import { SpinnerComponent } from '../reuseables/http-loader/spinner.component';
import { Header2Component } from "../components/header2/header2.component";
import { MomentAgoPipe } from '../reuseables/pipes/moment.pipe';

import { loadScript } from '../reuseables/helper';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule,SpinnerComponent,Header2Component,MomentAgoPipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  reqServerData = inject(RequestDataService);
  storeData = inject(StoreDataService);
  history = window.history

  ngOnInit(){

    if (!this.storeData.get('notifications')||!this.storeData.get('notifications').seen) {
      this.reqServerData.get('notifications/').subscribe()
    }

  }


  markAsRead(item: any) {
    // move from unseen → seen
    this.storeData.get('notification').seen.unshift(item);
    this.storeData.get('notification').unseen = this.storeData.get('notification').unseen.filter((n: any) => n.txref !== item.txref);
    this.storeData.store['unreadNotification'] -= 1
  }

}
