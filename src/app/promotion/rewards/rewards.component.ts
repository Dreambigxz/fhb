import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { StoreDataService } from '../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../reuseables/http-loader/request-data.service';
import { Header2Component } from "../../components/header2/header2.component";

import { QuickNavService } from '../../reuseables/services/quick-nav.service';

@Component({
  selector: 'app-rewards',
  imports: [
      CommonModule,CurrencyConverterPipe,
      SpinnerComponent,Header2Component,
],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.css'
})
export class RewardsComponent {

  storeData = inject(StoreDataService)
  reqServerData = inject(RequestDataService)
  quickNav = inject(QuickNavService)


  ngOnInit(){
      this.storeData.store['pageDetails']='promotions'
      if (!this.storeData.get('invite-rewards')) {this.reqServerData.get("invite-rewards?showSpinner").subscribe()}
  }

  getEarning(levelId: number): boolean {
    const earnedLevels = this.storeData.store['invite-rewards']?.earning_history || [];
    return earnedLevels.some((entry: any) => entry.level === levelId);
  }

  getProgress(level: any): number {
    const totalInvites = this.storeData.store['invite-rewards']?.total_invites || 0;

    if (this.getEarning(level.id)) {
      return 100; // completed level
    }

    const progress = (totalInvites / level.invites_required) * 100;
    return Math.min(progress, 100);
  }

  currencyConverter(amount:any){
    const payment_method = this.storeData.get('wallet').init_currency
    return amount * payment_method.rate
  }

}
