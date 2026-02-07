import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import { StoreDataService } from '../../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../../reuseables/http-loader/request-data.service';
import { MatchService } from '../../../reuseables/services/match.service';
import { TimeFormatPipe } from '../../../reuseables/pipes/time-format.pipe';
import { CountdownPipe } from '../../../reuseables/pipes/countdown.pipe';
import { TruncateCenterPipe } from '../../../reuseables/pipes/truncate-center.pipe';

import { loadScript, padNum } from '../../../reuseables/helper';

@Component({
  selector: 'app-upcomming',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe,CountdownPipe, TruncateCenterPipe],
  templateUrl: './upcomming.component.html',
  styleUrls: ['./upcomming.component.css', '../../../../matches-style2.css']
})
export class UpcommingComponent  {
  storeData = inject(StoreDataService);
  reqServerData = inject(RequestDataService);
  router = inject(Router);
  matchService = inject(MatchService);

  upcomingMatches: any;

  // ✅ Correct typing for Swiper instance
  swiper?: InstanceType<typeof Swiper>;
  slidesLoaded = false;

  async ngOnInit() {
    if (!this.storeData.get('soccer')) {
      this.reqServerData.get('soccer/?showSpinner').subscribe({
        next: (res) => {
          this.setData()
        }
      });
    } else {
      this.setData()
    }
  }

  async setData(): Promise<void>{

    this.matchService.setFixtures()
    this.matchService.upcoming(this.storeData.store['soccer']);

  }


}
