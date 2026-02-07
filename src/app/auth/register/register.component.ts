import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from '../../reuseables/http-loader/spinner.component';
import { AuthService } from '../../reuseables/auth/auth.service';

import { ReactiveFormsModule,FormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.component.css']
})
export class RegisterComponent {


  authService = inject(AuthService)

  async ngOnInit()   {
    this.authService.setRefCode()
  }

}
