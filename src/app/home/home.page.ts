import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  isLoading = false
  total_plan = null
  balance = null
  total_individual_plan = null
  total_group_plan = null
  user_info = {
    id:'',
    fname:'',
    lname:'',
    email:'',
    membership_id:'',
    status:''

  }
  plan = []
  slideOpts = {
    initialSlide: 0,
    speed: 7000,
    autoplay:true
  };

  constructor(
    public storage: Storage,
    public homeService:HomeService,
    public router: Router
  ) {}

  ngOnInit(){

  }

  ionViewWillEnter(){
    this.isLoading = true
    this.storage.get('user_info').then(res=>{
      this.user_info = res
      //console.log('home page.ts',this.user_info);
      this.homeService.getIndividualPlan(this.user_info.id).subscribe(res=>{
        console.log(res)
        this.plan = res
        this.isLoading = false
      })
      this.homeService.getBalance(this.user_info.id).subscribe(res=>{
        console.log('balance',res);
        this.balance = res
    });

    this.homeService.getTotalPlan(this.user_info.id).subscribe(res=>{
        console.log('Total Plan',res);
        this.total_plan = res
    });

    this.homeService.getTotalIndividualPlan(this.user_info.id).subscribe(res=>{
        console.log('Total Individual Plan',res);
        this.total_individual_plan = res
    });

    this.homeService.getTotalGrouplPlan(this.user_info.id).subscribe(res=>{
        console.log('Total Group Plan',res);
        this.total_group_plan = res
    });
    })
  }


  
}
