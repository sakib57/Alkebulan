import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewAllPaymentsPage } from './view-all-payments.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAllPaymentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewAllPaymentsPage]
})
export class ViewAllPaymentsPageModule {}
