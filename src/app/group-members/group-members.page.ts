import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.page.html',
  styleUrls: ['./group-members.page.scss'],
})
export class GroupMembersPage implements OnInit {
  hasData=false;
  msg='';
  group_info=[];

  constructor(private homeService: HomeService, private storage: Storage) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('user_info').then(res=>{ 
      const id = res.id;
      this.homeService.getGroupMember(id).subscribe(res=>{
          if(res.msg){
             this.msg=res.msg;
          }
          else{
              this.hasData=true;
              for(let i=0; i<res.length; i++){
                if(res[i][0]){
                  const data={
                    groupName: res[i][0].groupName,
                    type: res[i][0].type,
                    period: res[i][0].period,
                    amount: res[i][0].plan_amount,
                    num_of_member: res[i].length
                  }
                  this.group_info.push(data);
                }
            }
          }
      });
    }); 
  }
}
