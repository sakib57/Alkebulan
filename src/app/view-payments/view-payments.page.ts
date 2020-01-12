import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.page.html',
  styleUrls: ['./view-payments.page.scss'],
})
export class ViewPaymentsPage implements OnInit {
  isLoading = false
  term = 'individual'
  hasFamilyPlan = false
  groups=[];
  payments = []
  friend_payments = []
  friend_payments_received = []
  user_info = {
    id:'',
    fname:'',
    lname:'',
    email:'',
    membership_id:'',
    status:''
  }
  constructor(
    public storage: Storage,
    public homeService: HomeService
  ) { }

  ngOnInit() {
  }

  segmentChanged(event){
    this.term = event.detail.value
  }
  ionViewWillEnter(){
    this.isLoading = true
    this.payments = []
    this.friend_payments = []
    this.friend_payments_received = []
    this.term = 'individual'
    this.storage.get('user_info').then(res=>{
      this.user_info = res
      //===========================
      this.homeService.getViewPaymentsPlan(this.user_info.id).subscribe(val=>{
        
        for(let i = 0; i< val.length; i++){
          this.homeService.getViewPayments(val[i]['id']).subscribe(asd=>{
            if(val[i]['name']){
              asd[0]['plan_name'] = val[i]['name']
            }
            
            this.payments.push(asd)
            this.isLoading = false
          })
        }
        
      })
      //============================
      // this.homeService.getGroups(this.user_info.id).subscribe(res=>{
      //   //console.log(res)
      //   this.hasFamilyPlan = false
      //   for(let i = 0; i< res.length; i++){
      //     this.homeService.getFriendsPayments(res[i]['group_id'],this.user_info.id).subscribe(asd=>{
      //       //console.log(asd[0]['groupName'])
      //       //asd[0]['group_name'] = asd[i]['groupName']
      //         //console.log(asd)
      //         this.friend_payments.push(asd)
      //         if(asd.length > 0){
      //           this.hasFamilyPlan = true
      //         }
              
      //       this.isLoading = false
            
      //     })
      //   }
      //   for(let i = 0; i< res.length; i++){
      //     this.homeService.getFriendsPaymentsRecived(res[i]['group_id'],this.user_info.id).subscribe(asd=>{
      //       //console.log(asd)
      //       //asd[0]['plan_name'] = val[i]['name']
      //       this.friend_payments_received.push(asd)
      //     })
      //   }
      // })


      this.homeService.getFnfPayment(res.id).subscribe(res=>{
        this.groups=res;
     });
    })

    //console.log(this.friend_payments)
    console.log(this.payments)
    
  }

}
