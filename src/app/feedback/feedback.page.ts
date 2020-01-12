import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  submitAttempt = false;
  form: FormGroup;
  constructor(private router:Router, private storage: Storage,public formBuilder: FormBuilder, public homeService: HomeService) { 
    
    this.form = formBuilder.group({
      name: ['',Validators.compose([Validators.required])],
      title: ['',Validators.compose([Validators.required])],
      description: ['',Validators.compose([Validators.required])],
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
      this.storage.get('user_info').then(res=>{
         const user_id=res.id;
         const data = {
           user_id: user_id,
           name: this.form.value.name,
           title: this.form.value.title,
           description: this.form.value.description,
         }
         this.homeService.feedback(data).subscribe(res=>{
            this.router.navigateByUrl('/home');
         });
      });
    }
  }

}
