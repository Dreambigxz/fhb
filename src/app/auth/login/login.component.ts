import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { AuthService } from '../../reuseables/auth/auth.service';

import { ReactiveFormsModule,FormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../auth.component.css']
})
export class LoginComponent {

  authService = inject(AuthService)

  // async ngOnInit()   {
  // // Run JS file
  //   // loadScript('assets/js/main.js');
  //   // loadExternalScript()
  //   if (this.authService.checkLogin()) {
  //     this.authService.router.navigate(['/']); // or '/dashboard'
  //   }
  // }


}
