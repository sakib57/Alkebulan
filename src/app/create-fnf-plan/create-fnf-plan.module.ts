import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateFnfPlanPage } from './create-fnf-plan.page';

//import {RlTagInputModule} from 'angular2-tag-input';

const routes: Routes = [
  {
    path: '',
    component: CreateFnfPlanPage
  }
];

@NgModule({
  imports: [
   // RlTagInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateFnfPlanPage]
})
export class CreateFnfPlanPageModule {}
