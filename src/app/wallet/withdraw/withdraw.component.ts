import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header2Component } from "../../components/header2/header2.component";

import { TruncateCenterPipe } from '../../reuseables/pipes/truncate-center.pipe';
import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { StoreDataService } from '../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../reuseables/http-loader/request-data.service';
import { WalletService } from '../../reuseables/services/wallet.service';
import { TimeFormatPipe } from '../../reuseables/pipes/time-format.pipe';
import { CountdownPipe } from '../../reuseables/pipes/countdown.pipe';

import { FormHandlerService } from '../../reuseables/http-loader/form-handler.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { FlowComponent } from "../../flow/flow.component";

import { QuickNavService } from '../../reuseables/services/quick-nav.service';


@Component({
  selector: 'app-withdraw',
  imports: [
      Header2Component,CommonModule,FormsModule,
      ReactiveFormsModule, QRCodeComponent,CurrencyConverterPipe,
      SpinnerComponent,TruncateCenterPipe, TimeFormatPipe,CountdownPipe,
      FlowComponent
    ],
  templateUrl: './withdraw.component.html',
  // styleUrl:  "../wallet-styles.component.css"
  styleUrls: ['./withdraw.component.css', "../wallet-styles.component.css"]
})
export class WithdrawComponent {

  storeData = inject(StoreDataService)
  reqServerData = inject(RequestDataService)
  formHandler = inject(FormHandlerService)
  walletService = inject(WalletService);
  quickNav = inject(QuickNavService)


  amount : any;
  defaultImage = 'assets/upload.png'; // Put your placeholder image in assets

  selected = 'crypto';
  setNewPin : any

  ngOnInit(){

      this.storeData.store['pageDetails']='wallet'
      // if (!this.storeData.get('withdraw')) {this.reqServerData.get('wallet?dir=start_withdraw').subscribe(()=>this.walletService.setPaymentMode())}
      if (!this.storeData.get('withdraw')) {
        this.reqServerData.get('wallet?dir=start_withdraw').subscribe((res)=>{

          let hasPaymentMethod = this.walletService.setPaymentMode("", "", true);
          if(!this.storeData.get('hasPin')&&!this.walletService.initialized_currency){
            this.quickNav.openModal("setTransactionPin")
          }else{
            if (!hasPaymentMethod&&!this.walletService.initialized_currency) {
              this.quickNav.openModal("selectPaymentMethod")
            }else{
              if(!this.storeData.get('hasPin')){
                this.quickNav.openModal("setTransactionPin")
              }
            }
          }

          let getPaymentMethod=this.storeData.get('hasMethod')?.code ?? null

          if (getPaymentMethod&&['TRON',"USD"].includes(getPaymentMethod)) {
            this.walletService.fixedMethod(getPaymentMethod)
          }


      })}
  }

  select(option: string) {

    let mode=option.toUpperCase()

    if (mode === 'CRYPTO'){

      if (this.walletService.SelectedCrypto==="BANK") {
        this.walletService.SelectedCrypto='USD'
      }
      mode = this.walletService.SelectedCrypto
    }

    this.walletService.setPaymentMode(mode)
    this.walletService.initialized_currency = true
    this.quickNav.closeModal()
  }

}
