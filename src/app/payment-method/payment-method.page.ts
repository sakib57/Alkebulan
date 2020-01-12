import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
//import { Stripe } from '@ionic-native/stripe/ngx';

declare var Stripe;
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  form: FormGroup;
  submitAttempt = false
  hasBilling = false
  isLoading = false
  showCng = false
  setting = []
  user_info = {
    id:'',
    fname:'',
    lname:'',
    email:'',
    membership_id:'',
    status:''

  }

  pk = ''
  sk = ''

  card_info = {
    stripe_customer_card_id: "",
    stripe_customer_charge_pi_id: "",
    stripe_customer_id: "",
    stripe_customer_serial: ""
  }

  card_number = ''
  cvc_number = ''
  mm = ''
  yyyy = ''


  card_status = {
    number_valid : '',
    card_type : '',
    cvc_valid: '',
    date_valid: ''
  }

  client_secret = ''
  setti_id = ''
  payment_method = ''
  //stripe = Stripe(this.pk);
  stripe = Stripe('pk_test_AHIzf6AfWB86BxhnvdsRNepX000hqNXtZN');
  card: any;
  constructor(
    public storage: Storage,
    public homeService:HomeService,
    public router: Router,
    //public stripe: Stripe,
    public formBuilder: FormBuilder, 
  ) {
    this.form = formBuilder.group({
      card_number: ['',Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(16)])],
      exp_mm: ['',Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.max(12)])],
      exp_yy: ['',Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(4),Validators.maxLength(4)])],
      cvc: ['',Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(4),Validators.maxLength(4)])],
    })
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.card_info.stripe_customer_card_id = ''
    this.card_info.stripe_customer_id = ''
    this.card_info.stripe_customer_charge_pi_id = ''
    this.card_info.stripe_customer_serial = ''
    this.storage.get('user_info').then(res=>{
      this.user_info = res
      this.homeService.checkCardInfo(this.user_info.id).subscribe(val=>{
        //console.log(val)
        if(val != null){
          this.card_info = val
          console.log(this.card_info)
          this.hasBilling = true
          
        }
        console.log(this.card_info)
        //console.log(this.hasBilling)
        //this.isLoading = false
      })
    })
    //===========================================
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
      const data = {
        apiKey: this.sk
      }
      
       this.homeService.setApiKey(data).subscribe(res=>{
         //console.log(res)
         this.client_secret = res.client_secret
       })
    })
    

    this.setupStripe();
    
  }

  onSubmit(){
    this.stripe.handleCardSetup(this.client_secret,this.card).then(success=>{
      //console.log('success',success)
      this.setti_id = success.setupIntent.id
      this.payment_method = success.setupIntent.payment_method
      //console.log(this.setti_id)
      //console.log(this.payment_method)
      const data = {
        stripe_customer_id:this.card_info.stripe_customer_id,
        user_id:this.user_info.id,
        sk: this.sk,
        email: this.user_info.email,
        payment_method: this.payment_method
      }
      this.homeService.createCustomer(data).subscribe(res=>{
        console.log(res)
        this.hasBilling = true
      })
    },error=>{
      console.log('error',error)
    })
    
    
  }

  setupStripe(){
    //console.log('sdfsdsd')
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    //console.log(this.card)
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      // this.stripe.createToken(this.card)
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          //console.log(result);
        }
      });
    });
  }

  cng(){
    this.showCng = !this.showCng
  }

}
