import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-join-fnf-plan',
  templateUrl: './join-fnf-plan.page.html',
  styleUrls: ['./join-fnf-plan.page.scss'],
})
export class JoinFnfPlanPage implements OnInit {
 groups=[];
 selectedGroupId='';
 isDisabled=true;

  constructor(private storage:Storage, private homeService:HomeService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(res=>{
       this.homeService.getAllGroups(res.id).subscribe(res=>{
         for(let i=0; i<res.length; i++){
           const data={id: res[i].id, groupName: res[i].groupName}
           this.groups.push(data);
         }
       })
    })
  }

  
  selectedGroup(selectedValue: any){
    this.selectedGroupId=selectedValue.detail.value;
    this.isDisabled=false;
  }

 onSubmit(){
  this.storage.get('user_info').then(res=>{
      const data={user_id: res.id, group_id: this.selectedGroupId};
     // console.log(data);
      this.homeService.joinFnfPlan(data).subscribe(res=>{
       console.log(res);
      }) 
  });
 }

}
