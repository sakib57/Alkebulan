import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Payment Method',
      url: '/payment-method',
      icon: 'card',
      open: false,
    },
    {
      title: 'Individual Savings Plan',
      open: false,
      children: [
        {
          title: 'Plans',
          url: '/home',
          icon: 'person'
        }
      ]
      
    },
    {
      title: 'Family Savings Plan',
      open: false,
      children: [
        {
          title: 'Joined Plans',
          url: '/joined-plan',
          icon: 'people'
        },
        {
          title: 'Created Plans',
          url: '/created-plan',
          icon: 'people'
        },
        {
          title: 'Group Members',
          url: '/group-members',
          icon: 'people'
        },
      ]
    },
    {
      title: 'Loan',
      open: false,
      children: [
        {
          title: 'Apply for Loan',
          url: '/apply-loan',
          icon: 'cash'
        },
        {
          title: 'My Loan',
          url: '/my-loan',
          icon: 'cash'
        },
      ]
    },
    {
      title: 'Payments',
      open: false,
      children: [
        {
          title: 'Payments',
          url: '/view-payments',
          icon: 'cash'
        },
        {
          title: 'Late Payments',
          url: '/late-payments',
          icon: 'cash'
        },
      ]
      
    },
    {
      title: 'Request to Join Plan',
      open: false,
      children: [
        {
          title: 'Plans',
          url: '/request-to-join',
          icon: 'home'
        }
      ]
      
    },
    {
      title: 'Select a Plan',
      url: '/select-plan',
      icon: 'paper',
      open: false,
    },
    {
      title: 'Feedback',
      url: '/feedback',
      icon: 'chatbubbles',
      open: false,
    },
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage:Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.storage.set('user_info',null);
    this.router.navigateByUrl('/');
  }
}
