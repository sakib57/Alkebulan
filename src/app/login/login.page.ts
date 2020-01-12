import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submitAttempt = false;
  form: FormGroup;
  loginErrorMsg='';  

  constructor(
    public formBuilder: FormBuilder, 
    public loadingController: LoadingController, 
    public router: Router,
    public authenticationService: AuthenticationService,
    public storage: Storage
  ) 
  { 
      this.form = formBuilder.group({
        email: ['',Validators.compose([Validators.required, Validators.email])],
        password: ['',Validators.compose([Validators.required,Validators.minLength(4)])],
      })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.submitAttempt = true;
      if(!this.form.valid){
         return
      }
      else{
          this.presentLoading()
          const data = {
              email: this.form.value.email,
              password: this.form.value.password,
          }

          this.authenticationService.login(data).subscribe(res=>{
                if(res.msg){
                  this.loginErrorMsg=res.msg;
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
                    this.loadingController.dismiss();
                    this.form.reset();
                    this.loginErrorMsg=''
                    this.router.navigateByUrl('/home');
                }
          })
      }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      duration: 100
    });
    await loading.present();
  }

}
