import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { StoreDataService } from '../../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../../reuseables/http-loader/request-data.service';
import { MatchService } from '../../../reuseables/services/match.service';
import { TimeFormatPipe } from '../../../reuseables/pipes/time-format.pipe';
import { CountdownPipe } from '../../../reuseables/pipes/countdown.pipe';

import { loadScript, padNum } from '../../../reuseables/helper';

@Component({
  selector: 'app-secured',
  imports: [CommonModule, TimeFormatPipe,CountdownPipe],
  templateUrl: './secured.component.html',
  styleUrl: './secured.component.css'
})
export class SecuredComponent {

  storeData = inject(StoreDataService);
  reqServerData = inject(RequestDataService);
  router = inject(Router);
  matchService = inject(MatchService);

  upcomingMatches: any;

  // ✅ Correct typing for Swiper instance
  slidesLoaded = false;

  ngOnInit() {this.setData()}

  setData(){
    this.matchService.setFixtures()
    this.matchService.companyGame(this.storeData.get("company_games"));
  }


}
