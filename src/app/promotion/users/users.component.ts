import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header2Component } from "../../components/header2/header2.component";
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { filter } from 'rxjs/operators';

import { RouterLink, Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { QuickNavService } from '../../reuseables/services/quick-nav.service';
import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';

@Component({
  selector: 'app-users',
  imports: [CommonModule,Header2Component,SpinnerComponent,CurrencyConverterPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  router=inject(Router)
  route=inject(ActivatedRoute)
  quickNav=inject(QuickNavService)


  subUsersContent:any=[]

  ngOnInit(){

    let level = this.route.snapshot.paramMap.get('level')
    // Watch for route changes
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        level = this.route.snapshot.paramMap.get('level')
        this.loadUsers(level)
    });

    this.loadUsers(level)

  }

  loadUsers(generation:any=null){
    if (!this.quickNav.storeData.get('promotionLevel_'+generation)) {
          this.quickNav.reqServerData.get('promotions/?level='+generation).subscribe({next: res => {
            this.subUsersContent = this.quickNav.storeData.get('promotionLevel_'+generation)
          }})
      }else{
        this.subUsersContent= this.quickNav.storeData.get('promotionLevel_'+generation)
      }

  }

}
