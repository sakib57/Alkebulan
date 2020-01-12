import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'request-to-join', loadChildren: './request-to-join/request-to-join.module#RequestToJoinPageModule' },
  { path: 'view-payments', loadChildren: './view-payments/view-payments.module#ViewPaymentsPageModule' },
  { path: 'late-payments', loadChildren: './late-payments/late-payments.module#LatePaymentsPageModule' },
  { path: 'membership', loadChildren: './membership/membership.module#MembershipPageModule' },
  { path: 'joined-plan', loadChildren: './joined-plan/joined-plan.module#JoinedPlanPageModule' },
  { path: 'created-plan', loadChildren: './created-plan/created-plan.module#CreatedPlanPageModule' },
  { path: 'group-members', loadChildren: './group-members/group-members.module#GroupMembersPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'select-plan', loadChildren: './select-plan/select-plan.module#SelectPlanPageModule' },
  { path: 'select-individual-plan', loadChildren: './select-individual-plan/select-individual-plan.module#SelectIndividualPlanPageModule' },
  { path: 'select-family-plan', loadChildren: './select-family-plan/select-family-plan.module#SelectFamilyPlanPageModule' },
  { path: 'view-members/:id', loadChildren: './view-members/view-members.module#ViewMembersPageModule' },
  { path: 'payment-method', loadChildren: './payment-method/payment-method.module#PaymentMethodPageModule' },
  { path: 'create-fnf-plan', loadChildren: './create-fnf-plan/create-fnf-plan.module#CreateFnfPlanPageModule' },
  { path: 'join-fnf-plan', loadChildren: './join-fnf-plan/join-fnf-plan.module#JoinFnfPlanPageModule' },
  { path: 'view-all-payments/:id', loadChildren: './view-all-payments/view-all-payments.module#ViewAllPaymentsPageModule' },
  { path: 'apply-loan', loadChildren: './apply-loan/apply-loan.module#ApplyLoanPageModule' },
  { path: 'my-loan', loadChildren: './my-loan/my-loan.module#MyLoanPageModule' },
  { path: 'success-loan-application', loadChildren: './success-loan-application/success-loan-application.module#SuccessLoanApplicationPageModule' }


  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
