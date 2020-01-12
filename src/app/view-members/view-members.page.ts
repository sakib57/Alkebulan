import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.page.html',
  styleUrls: ['./view-members.page.scss'],
})
export class ViewMembersPage implements OnInit {
  hasData=false;
  msg='';
  members=[];
  groupName='';

  constructor(private homeService: HomeService, private storage: Storage, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.storage.get('user_info').then(res=>{
        const id = res.id;
        this.homeService.getGroupMember(id).subscribe(res=>{
               var group_index = this.route.snapshot.paramMap.get('id');
               if(res[group_index]){
                  this.hasData=true;
                  this.members=res[group_index];
                  this.groupName=this.members[0].groupName;
               }
               else{
                 this.msg='No data Found !';
               }
        });
    })
  }

}

