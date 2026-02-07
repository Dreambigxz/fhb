import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header2Component } from "../../components/header2/header2.component";

import { TruncateCenterPipe } from '../../reuseables/pipes/truncate-center.pipe';
import { CurrencyConverterPipe } from '../../reuseables/pipes/currency-converter.pipe';
import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { StoreDataService } from '../../reuseables/http-loader/store-data.service';
import { RequestDataService } from '../../reuseables/http-loader/request-data.service';
import { WalletService, PaymentMethod } from '../../reuseables/services/wallet.service';
import { TimeFormatPipe } from '../../reuseables/pipes/time-format.pipe';
import { CountdownPipe } from '../../reuseables/pipes/countdown.pipe';

import { FormHandlerService } from '../../reuseables/http-loader/form-handler.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';


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
  reqServerData = inject(RequestDataService)
  formHandler = inject(FormHandlerService)
  walletService = inject(WalletService);

  fb = inject(FormBuilder);
  form = this.fb.group({
    amount:['',[Validators.required]],
    method:["", [Validators.required]],

  })
  amount : any;
  selectedMethod: PaymentMethod = 'USD';
  selectedCrypto: 'USDT' | 'TRON' | null = null;

  pendingPayment:any = []
  defaultImage = 'assets/upload.png'; // Put your placeholder image in assets

  ngOnInit(){
    let mode;
    this.selectedMethod = this.walletService.getPaymentMethod();
      this.storeData.store['pageDetails']='wallet'
      if (!this.storeData.get('wallet')) {
        this.reqServerData.get('wallet?dir=start_deposit').subscribe({
          next:(res)=>{
            console.log(res);

              // mode = this.storeData.get('hasMethod')?.code || this.storeData.get('deposit') || this.selectedMethod
              // if (!['TRON',"USD"].includes(mode)) {mode="BANK"}
              this.walletService.setPaymentMode()//mode,this.storeData.store["savedMethod"])
              this.walletService.setDepositView()
          }
        })
      }
  }

}
