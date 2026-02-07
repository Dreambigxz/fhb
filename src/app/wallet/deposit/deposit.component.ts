import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { StoreDataService } from '../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../reuseables/http-loader/request-data.service';
import { Header2Component } from "../../components/header2/header2.component";

import { WalletService } from '../../reuseables/services/wallet.service';
import { TimeFormatPipe } from '../../reuseables/pipes/time-format.pipe';
import { CountdownPipe } from '../../reuseables/pipes/countdown.pipe';
import { TruncateCenterPipe } from '../../reuseables/pipes/truncate-center.pipe';

import { FormHandlerService } from '../../reuseables/http-loader/form-handler.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { QuickNavService } from '../../reuseables/services/quick-nav.service';


@Component({
  selector: 'app-deposit',
  imports: [
      Header2Component,CommonModule,FormsModule,
      ReactiveFormsModule, QRCodeComponent,CurrencyConverterPipe,
      SpinnerComponent,TruncateCenterPipe, TimeFormatPipe,CountdownPipe
    ],
  templateUrl: './deposit.component.html',
  // styleUrl: './deposit.component.css'
  styleUrls: ['./deposit.component.css', "../wallet-styles.component.css"]

})
export class DepositComponent {

  storeData = inject(StoreDataService)
  quickNav = inject(QuickNavService)
  reqServerData = inject(RequestDataService)
  formHandler = inject(FormHandlerService)
  walletService = inject(WalletService);

  amount : any;

  pendingPayment:any = []
  defaultImage = 'assets/upload.png'; // Put your placeholder image in assets

  sendSendersName=false

  ngOnInit(){

      this.storeData.store['pageDetails']='wallet'
      if (!this.storeData.get('deposit')) {
        this.reqServerData.get('wallet?dir=start_deposit').subscribe((res)=>{
          let hasPaymentMethod = this.walletService.setPaymentMode("", "", true);
          if (!hasPaymentMethod&&!this.walletService.initialized_currency) {
            this.quickNav.openModal("selectPaymentMethod")

          }
          //
          let getPaymentMethod=this.storeData.get('hasMethod')?.code ?? null

          if (getPaymentMethod&&['TRON',"USD"].includes(getPaymentMethod)) {
            this.walletService.fixedMethod(getPaymentMethod)
          }
      })}


  }

  goToPaymentPage(deposit:any){

    let [extraField,url] = [deposit.extraField,'']

    url = extraField.url || extraField.order_data
    console.log({extraField});


    window.open(url, '_blank'); // opens in a new tab

  }

  selected = 'crypto';

  cryptoCurrency = 'usdt';
  cryptoAmount = 0;
  walletAddress = "TJxxx123exampleaddressTRC20";

  bankCurrency = 'NGN';
  senderName = '';
  uploadedReceipt: any = null;

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
