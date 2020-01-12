import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from '../services/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-select-individual-plan',
  templateUrl: './select-individual-plan.page.html',
  styleUrls: ['./select-individual-plan.page.scss'],
})
export class SelectIndividualPlanPage implements OnInit {
  isLoading = false
  test_mood = ""
  user_info = {
    id:'',
    fname:'',
    lname:'',
    email:'',
    membership_id:'',
    status:''

  }
  submitAttempt = false;
  form: FormGroup;

  setting = []
  pk = ''
  sk = ''


  selectedPlanType: string = ''; 
  selectedPlanPeriod: string = ''; 
  selectedPlanId: string = ''; 

  isPriceDisabled=true;
  isPeriodDisabled=true;

  types=[];
  periods=[];
  prices=[];

  card_info = {
    stripe_customer_card_id: "",
    stripe_customer_charge_pi_id: "",
    stripe_customer_id: "",
    stripe_customer_serial: ""
  }
  constructor(
    public storage: Storage,
    public homeService:HomeService,
    public router: Router,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder, 
  ) { 

    this.form = formBuilder.group({
      plan_name: ['',Validators.compose([Validators.required])],
    })

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.homeService.getTestMode().subscribe(res=>{
      console.log(res);
      this.test_mood = res
    });
    //==========================================================
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


    //=======================================================
    this.storage.get('user_info').then(res=>{
      this.user_info = res
      this.isLoading = true
      this.homeService.checkCardInfo(this.user_info.id).subscribe(val=>{
        //console.log(val)
        
        this.card_info = val
        console.log(this.card_info)
        this.isLoading = false
      })
      //this.isLoading = false
    })
    
    
    this.homeService.getPlanTypes().subscribe(res=>{
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
                  name: this.form.value.plan_name,
                  planid: this.selectedPlanId,
                  plan_type: this.selectedPlanType,
                  plan_period: this.selectedPlanPeriod,
                  sk: this.sk
              }
              this.homeService.saveIndividualPlan(data).subscribe(res=>{
                console.log(res);
                if(res){
                  this.form.reset();
                  this.router.navigateByUrl('/select-plan');
                } 
              })
          })
        }
    }
}
