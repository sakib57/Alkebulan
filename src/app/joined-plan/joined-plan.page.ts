import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-joined-plan',
  templateUrl: './joined-plan.page.html',
  styleUrls: ['./joined-plan.page.scss'],
})
export class JoinedPlanPage implements OnInit {
  
  joinedPlan=[];

  constructor(private homeService: HomeService, private storage: Storage) { }
  
  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.storage.get('user_info').then(res=>{ 
      const id = res.id;
      this.homeService.getJoinedPlan(id).subscribe(res=>{
         this.joinedPlan=res;
      });

      this.homeService.getLatePayment(id).subscribe(res=>{
          
      });

      this.homeService.getBalance(id).subscribe(res=>{
          console.log('balance',res);
      });

      this.homeService.getTotalPlan(id).subscribe(res=>{
          console.log('Total Plan',res);
      });

      this.homeService.getTotalIndividualPlan(id).subscribe(res=>{
          console.log('Total Individual Plan',res);
      });

      this.homeService.getTotalGrouplPlan(id).subscribe(res=>{
          console.log('Total Group Plan',res);
      });
    }); 

  }
}

