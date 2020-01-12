import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-to-join',
  templateUrl: './request-to-join.page.html',
  styleUrls: ['./request-to-join.page.scss'],
})
export class RequestToJoinPage implements OnInit {

  isLoading = false
  user_info = {
    id:'',
    fname:'',
    lname:'',
    email:'',
    membership_id:'',
    status:''

  }
  plan = []
  constructor(
    public storage: Storage,
    public homeService: HomeService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.storage.get('user_info').then(res=>{
      this.user_info = res
      //console.log('home page.ts',this.user_info);
      this.homeService.getRequestToJoinPlan(this.user_info.id).subscribe(res=>{
        console.log(res)
        this.plan = res
        this.isLoading = false
      })
    })
    
  }

  accept(inv_id,index){
    console.log(inv_id)
    this.homeService.acceptJoinReq(inv_id).subscribe(res=>{
      console.log(res)
      if(res.status == 200){
        this.plan.splice(index, 1);
      }
    })
  }
  deny(inv_id,index){
    console.log(inv_id)
    this.homeService.denyJoinReq(inv_id).subscribe(res=>{
      console.log(res)
      if(res.status == 200){
        this.plan[index]['is_joined'] = '2'
      }
    })
  }



}
