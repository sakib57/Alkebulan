import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  submitAttempt = false;
  form: FormGroup;
  paswordMatch= true;
  regiterErrorMsg='';

  constructor(public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    public router:Router,
    public storage:Storage
    ) {	

      this.form = formBuilder.group({
          fname: ['',Validators.compose([Validators.required])],
          lname: ['',Validators.compose([Validators.required])],
          email: ['',Validators.compose([Validators.required, Validators.email])],
          password: ['',Validators.compose([Validators.required,Validators.minLength(4)])],
          confirm_password: ['',Validators.compose([Validators.required])]
      })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.submitAttempt = true;
       if(!this.form.valid){
         return
       }
       else {
         if(this.form.value.password!=this.form.value.confirm_password){
            this.paswordMatch=false;
         }
        
          const data = {
              fname: this.form.value.fname,
              lname: this.form.value.lname,
              email: this.form.value.email,
              password: this.form.value.password,
          }

          this.authenticationService.register(data).subscribe(res=>{
              if(res.msg){
                this.regiterErrorMsg=res.msg;
              }
              else{
                  const user_info = {
                      address: res.address,
                      created_on: res.created_on,
                      email: res.email,
                      fname: res.fname,
                      id: res.id,
                      lname: res.lname,
                      membership_id: res.membership_id,
                      nominy_name: res.nominy_name,
                      nominy_phone: res.nominy_phone,
                      phone: res.phone,
                      relation: res.relation,
                      status: res.status
                  }
                  this.storage.set('user_info',user_info);
                  this.form.reset();
                  this.regiterErrorMsg='';
                  this.router.navigateByUrl('/home');
              }
          })
     }
  }

}
