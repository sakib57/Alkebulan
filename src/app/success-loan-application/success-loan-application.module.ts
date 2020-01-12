import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SuccessLoanApplicationPage } from './success-loan-application.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessLoanApplicationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SuccessLoanApplicationPage]
})
export class SuccessLoanApplicationPageModule {}
