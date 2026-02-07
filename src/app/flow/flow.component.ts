import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickNavService } from '../reuseables/services/quick-nav.service';

@Component({
  selector: 'app-flow',
  imports: [CommonModule],
  templateUrl: './flow.component.html',
  styleUrl: './flow.component.css'
})
export class FlowComponent {

  quickNav = inject(QuickNavService)

  progressValue = 0; // 0 to 6
  progressPercent = 0; // 0 to 100

  setProgress(value: number, progress:number) {
    this.progressValue = value;
    this.progressPercent = (value / progress) * 100;
  }

  ngOnInit(){

    setTimeout(() => {
      if (!this.quickNav.storeData.store['bet_settings']){
        this.quickNav.reqServerData.get("main?req_type=bet_settings").subscribe((res)=>{
          const bet_settings = this.quickNav.storeData.get('bet_settings')
          this.setProgress(bet_settings.total_company_game,bet_settings.required.company_game)
        })
      }else{
        const bet_settings = this.quickNav.storeData.get('bet_settings')
        this.setProgress(bet_settings.total_company_game,bet_settings.required.company_game)

      }

    }, 4000);
  }

}
