import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { DatePicker } from '@ionic-native/date-picker/ngx';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.page.html',
  styleUrls: ['./apply-loan.page.scss'],
})
export class ApplyLoanPage implements OnInit {
  date_of_birth :  Date
  emp_start_date : Date

  numbers = []
  street = ''
  town = ''
  county = ''
  submitAttempt = false;
  form: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public datePicker: DatePicker,
    public homeService: HomeService,
    public alertController: AlertController,
    public router: Router
  ) {
    this.form = formBuilder.group({
      first_name: ['',Validators.compose([Validators.required])],
      last_name: ['',Validators.compose([Validators.required])],
      date: [''],
      no_of_dependents: [''],
      home_tel: [''],
      mobile: [''],
      email: ['',Validators.compose([Validators.required,Validators.email])],
      national_insurance_num: [''],
      house_name_num: [''],
      flat_num: [''],
      years_at_addr: [''],
      city: [''],
      post_code: [''],
      numbers: [''],
      street: [''],
      town: [''],
      country: [''],
      month_at_addr: [''],
      rent_or_mortgage: [''],
      employee_status: [''],
      job_title: [''],
      curr_sick_leave: [''],
      employer_name: [''],
      emp_start_date: [''],
      work_tel_num: [''],
      work_office_building_num: [''],
      work_street: [''],
      work_town: [''],
      work_post_code: [''],
      work_country: [''],
      specefic_reason: [''],
      borrow_amount: ['',Validators.compose([Validators.required])],
      net_income: [''],
      total_owe: [''],
      save_amount: [''],
      repay_amount: [''],
      pay_saving_freq: [''],
      repay_method: [''],
      
      
    })
  }

  ngOnInit() {
  }


  onSubmit(){
    //console.log(this.form.value)
    this.submitAttempt = true;
    if(!this.form.valid){
      return
    }else{
      const data = {
        first_name : this.form.value.first_name,
        last_name : this.form.value.last_name,
        date : this.form.value.date.toString(),
        no_of_dependents : this.form.value.no_of_dependents,
        home_tel : this.form.value.home_tel,
        mobile : this.form.value.mobile,
        email : this.form.value.email,
        national_insurance_num : this.form.value.national_insurance_num,
        house_name_num : this.form.value.house_name_num,
        flat_num : this.form.value.flat_num,
        street : this.form.value.street,
        town : this.form.value.town,
        country : this.form.value.country,
        years_at_addr : this.form.value.years_at_addr,
        city : this.form.value.city,
        post_code : this.form.value.post_code,
        numbers : this.form.value.numbers,
        month_at_addr : this.form.value.month_at_addr,
        rent_or_mortgage : this.form.value.rent_or_mortgage,
        employee_status : this.form.value.employee_status,
        job_title : this.form.value.job_title,
        curr_sick_leave : this.form.value.curr_sick_leave,
        employer_name : this.form.value.employer_name,
        emp_start_date : this.form.value.emp_start_date.toString(),
        work_tel_num : this.form.value.work_tel_num,
        work_office_building_num : this.form.value.work_office_building_num,
        work_street : this.form.value.work_street,
        work_town : this.form.value.work_town,
        work_post_code : this.form.value.work_post_code,
        work_country : this.form.value.work_country,
        specefic_reason : this.form.value.specefic_reason,
        borrow_amount : this.form.value.borrow_amount,
        net_income : this.form.value.net_income,
        total_owe : this.form.value.total_owe,
        pay_saving_freq : this.form.value.pay_saving_freq,
        save_amount : this.form.value.save_amount,
        repay_amount : this.form.value.repay_amount,
        repay_method : this.form.value.repay_method,
      }

      this.homeService.loanApplication(data).subscribe(res=>{
        console.log(res)
        if(res.code == 200){
          this.router.navigateByUrl('/success-loan-application')
        }else{
          return
        }
      })

    }
  }

  
  

  getAddr(){
    const code = this.form.value.post_code
    if(code && code.length >5){
      this.homeService.getAddress(code).subscribe(res=>{
        console.log(res)
        var raw = res.addresses[0];
        var values = raw.split(',');
        this.street = values[1]
        this.town = values[5]
        this.county = values[6]

        for(var i = 0 ; i<res.addresses.length; i++ ){
          var num = res.addresses[i].split(',');
          this.numbers.push(num[0])
        }
      })
    }else{
      this.presentAlert("Invalid Post Code")
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
