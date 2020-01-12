import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-late-payments',
  templateUrl: './late-payments.page.html',
  styleUrls: ['./late-payments.page.scss'],
})
export class LatePaymentsPage implements OnInit {

  isLoading = false
  Latepayments = []
  user_info = {
    id:'',
    fname:'',
    lname:'',
    email:'',
    membership_id:'',
    status:''
  }
  setting = []
  pk = ''
  sk = ''
  constructor(
    public storage: Storage,
    public homeService: HomeService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.storage.get('user_info').then(res=>{
      this.user_info = res
      this.homeService.getLatePayment(this.user_info.id).subscribe(res=>{
          //console.log('hkjkjhkj',res);
          this.Latepayments = res
          //console.log(this.Latepayments)
          this.isLoading = false
      });
    })
    this.homeService.getTestMode().subscribe(res=>{
      //console.log(res)
      this.setting = res
      if(this.setting[0]['settings_val'] == 'on'){
        this.pk = this.setting[2]['settings_val']
        this.sk = this.setting[1]['settings_val']
      }else{
        this.pk = this.setting[4]['settings_val']
        this.sk = this.setting[3]['settings_val']
      }
    })

  }

  payWithId(id,due_id,index){
    //console.log(id,due_id)
    const data = {
      group_id: id,
      user_id: due_id,
      sk: this.sk
    }
    
    this.homeService.latePayWithId(data).subscribe(res=>{
      if(res){
        this.Latepayments.splice(index, 1);
      }
    })
  }
  payWithoutId(user_selected_plan_id,index){
    //console.log(user_selected_plan_id)
    const data = {
      user_selected_plan_id: user_selected_plan_id,
      sk: this.sk,
    }
    
    this.homeService.latePayWithoutId(data).subscribe(res=>{
      if(res){
        this.Latepayments.splice(index, 1);
      }
    })
  }

}
