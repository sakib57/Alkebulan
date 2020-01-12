import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-view-all-payments',
  templateUrl: './view-all-payments.page.html',
  styleUrls: ['./view-all-payments.page.scss'],
})
export class ViewAllPaymentsPage implements OnInit {
  groupName='';
  payments=[];
  r_payments=[];

  constructor(public route:ActivatedRoute, public service:HomeService, public storage:Storage) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    
    this.storage.get('user_info').then(res=>{
      var group_id = this.route.snapshot.paramMap.get('id');
      this.service.getOnePayment(group_id,res.id).subscribe(res=>{
         if(res.all_payments.length>0){
           this.payments=res.all_payments;
           this.groupName=res.all_payments[0].groupName;
         }
         if(res.received_payments.length>0){
           this.r_payments=res.received_payments;
           this.groupName=res.received_payments[0].groupName;
         }
      })
    })

  }
}
