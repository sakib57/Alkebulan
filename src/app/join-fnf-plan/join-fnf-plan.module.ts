import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JoinFnfPlanPage } from './join-fnf-plan.page';

const routes: Routes = [
  {
    path: '',
    component: JoinFnfPlanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JoinFnfPlanPage]
})
export class JoinFnfPlanPageModule {}
