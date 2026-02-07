import { Component, inject} from '@angular/core';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


import { Header2Component } from "../components/header2/header2.component";
import { SpinnerComponent } from '../reuseables/http-loader/spinner.component';

import { RouterLink, Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { RequestDataService } from '../reuseables/http-loader/request-data.service';
import { StoreDataService } from '../reuseables/http-loader/store-data.service';
import { BetslipComponent } from "../components/main/betslip/betslip.component";

import { MatchService } from '../reuseables/services/match.service';
import { TimeFormatPipe } from '../reuseables/pipes/time-format.pipe';
import { CountdownPipe } from '../reuseables/pipes/countdown.pipe';

@Component({
  selector: 'app-betinfo',
  imports: [Header2Component,CommonModule,
    BetslipComponent,TimeFormatPipe,
    SpinnerComponent,CountdownPipe
  ],
  templateUrl: './betinfo.component.html',
  styleUrls: ['./betinfo.component.css', '../../matches-style.css']
})
export class BetinfoComponent {

  pageName = 'Details'
  route = inject(ActivatedRoute)
  router=inject(Router)

  storeData = inject(StoreDataService)
  reqServerData = inject(RequestDataService)
  matchService = inject(MatchService);


  fixtures:any
  fixture:any
  predictionRows:any
  fixtureID:any
  nextDayData=false

  activeRow:any
  activeID:any

  excludeScores = ["4-4"]

  ngOnInit (): void {

    // loadScript('assets/js/main.js');

    // Watch for route changes
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.urlAfterRedirects.includes('betinfo')) {
        this.setData()
      }
    });

      if (!this.storeData.store['soccer']) {

        this.reqServerData.get('soccer/?showSpinner').subscribe({
            next:res=>{
              this.setData()
          }
      })
    }else{
      this.setData()
    }


  }

  setData(){

    this.matchService.setFixtures()
    this.fixtures=this.storeData.store['soccer']
    this.matchService.addingFixture=null

    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.fixtureID=id


    const [secured] =  this.storeData.get('company_games')?.filter((m: any) => m.fixtureID == id)
    const [fixture]= this.fixtures.filter((m:any)=>m.fixtureID===id);this.fixture=fixture

    this.predictionRows =fixture?.odds//['odds'][id]

    if (secured) {
      this.matchService.showBetSlip(this.fixture,{odds:secured.data.odds,value:secured.data.value});
      this.activeRow=secured.data.value
    }

    this.activeID=0
  }


}
