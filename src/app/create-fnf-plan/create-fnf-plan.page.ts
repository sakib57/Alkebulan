import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from '../services/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-create-fnf-plan',
  templateUrl: './create-fnf-plan.page.html',
  styleUrls: ['./create-fnf-plan.page.scss'],
})
export class CreateFnfPlanPage implements OnInit {
  submitAttempt = false;
  form: FormGroup;

  selectedPlanType: string = ''; 
  selectedPlanPeriod: string = ''; 
  selectedPlanId: string = ''; 

  isPriceDisabled=true;
  isPeriodDisabled=true;

  types=[];
  periods=[];
  prices=[];
  
  isResultReady=false;
  selectedItems=[];
  items=[];

  autocomplete: { input: string; }; 
  constructor( 
    public storage: Storage,
    public homeService:HomeService,
    public router: Router,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder, ) { 

      this.form = formBuilder.group({
        group_name: ['',Validators.compose([Validators.required])],
      })

    }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.homeService.getPlanTypes2().subscribe(res=>{
      for(let i=0; i<res.length; i++){
        const data={id:res[i].id, type: res[i].type}
        this.types.push(data)
     }
    })
  }

  selectedType(selectedValue: any){
    this.isPeriodDisabled=false;
    this.selectedPlanType=selectedValue.detail.value;
    this.homeService.getPlanPeriod(selectedValue.detail.value).subscribe(res=>{
        for(let i=0; i<res.length; i++){
          const data={id:res[i].id, period: res[i].period}
          this.periods.push(data)
        }
    }) 
}

ionInput(keyword){
  if(keyword.target.value == '')
  {
    this.isResultReady=false;
  }
  else{
    const users=[];
    this.homeService.searchResult(keyword.target.value).subscribe(res=>{
          for(let i=0; i<res.length; i++){
            const data={
              id: res[i].id,
              email: res[i].email,
              fname: res[i].fname,
              lname: res[i].lname
            }
            users.push(data);
          }
          this.items=users;
          this.isResultReady=true;
    })
  }
}

onItem(id, fname, lname, email){
  this.isResultReady=false;
  const data={
    id: id, fname:fname, lname:lname, email:email
  }
  this.selectedItems.push(data);
  console.log(this.selectedItems);
}

cancleSelectedItem(i){
  this.selectedItems.splice(i, 1);
}

selectedPeriod(selectedValue: any){
  this.isPriceDisabled=false;
  this.selectedPlanPeriod=selectedValue.detail.value;
  this.homeService.getPlanPrices(selectedValue.detail.value).subscribe(res=>{
    for(let i=0; i<res.length; i++){
      const data={id:res[i].id, price: res[i].price}
      this.prices.push(data)
    }
  }) 
}

selectedPrice(selectedValue: any){
  this.selectedPlanId=selectedValue.detail.value;
}

onSubmit(){
  this.submitAttempt = true;
    if(!this.form.valid){
       return
    }
    else{
      this.storage.get('user_info').then(res=>{
          const data ={
              user_id: res.id,
              name: this.form.value.group_name,
              planid: this.selectedPlanId,
              plan_type: this.selectedPlanType,
              plan_period: this.selectedPlanPeriod
          }

          this.homeService.createFnfPlan(data).subscribe(res=>{
              this.form.reset();
              if(this.selectedItems.length>0){
                 this.homeService.saveGroupMember(res,this.selectedItems).subscribe(res=>{
                    this.router.navigateByUrl('/select-family-plan');
                 })
              }
          })
      })
    }
}

}
