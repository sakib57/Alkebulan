import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-created-plan',
  templateUrl: './created-plan.page.html',
  styleUrls: ['./created-plan.page.scss'],
})
export class CreatedPlanPage implements OnInit {
  createdPlan=[]
  constructor(private homeService: HomeService, private storage: Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(res=>{ 
      const id = res.id;
      this.homeService.getCreatedPlan(id).subscribe(res=>{
         this.createdPlan=res;
         console.log(this.createdPlan);
      });
    }); 
  }
}
