import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiLink = environment.apiLink

  constructor(
    public http: HttpClient
  ) { }


  getIndividualPlan(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getIndividualPlan`);
  }
  getRequestToJoinPlan(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getRequestToJoinPlan`);
  }
  getViewPaymentsPlan(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getViewPaymentsPlan`);
  }
  getViewPayments(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getViewPayments`);
  }
  getGroups(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getGroups`);
  }
  getFriendsPayments(id,user_id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getFriendsPayments&query_id=${user_id}`);
  }
  getFriendsPaymentsRecived(id,user_id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getFriendsPaymentsRecived&query_id=${user_id}`);
  }

  getLatePayment(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getLatePayment`);
  }

  getJoinedPlan(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getJoinedPlan`);
  }

  getCreatedPlan(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getCreatedPlan`);
  }

  getGroupMember(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getGroupMember`);
  }
  
  

  
  feedback(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'feedback',user_id: data.user_id,name:data.name,title:data.title, description:data.description}, httpOptions
    )
  }


  getBalance(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getBalance`);
  }
  
  getTotalPlan(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getTotalPlan`);
  }

  getTotalIndividualPlan(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getTotalIndividualPlan`);
  }

  getTotalGrouplPlan(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getTotalGrouplPlan`);
  }
  getTestMode(){
    return this.http.get<any>(`${this.apiLink}?action=getTestMode`);
  }

  checkCardInfo(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=checkCardInfo`);
  }

  setApiKey(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'setApiKey',apiKey: data.apiKey}, httpOptions
    )
  }

  createCustomer(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { 
        action: 'createCustomer',
        stripe_customer_id:data.stripe_customer_id,
        user_id:data.user_id,sk:data.sk,
        email: data.email,
        payment_method:data.payment_method
      }, httpOptions
    )
  }

  acceptJoinReq(inv_id){
    return this.http.get<any>(`${this.apiLink}/${inv_id}?action=acceptJoinReq`);
  }
  denyJoinReq(inv_id){
    return this.http.get<any>(`${this.apiLink}/${inv_id}?action=denyJoinReq`);
  }

  latePayWithId(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      {action: 'latePayWithId',group_id:data.group_id,user_id:data.user_id,sk:data.sk}, httpOptions
    )
  }
  latePayWithoutId(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      {action: 'latePayWithoutId',user_selected_plan_id:data.user_selected_plan_id,sk:data.sk}, httpOptions
    )
  }
  //================================================
  getPlanTypes(){
    return this.http.get<any>(`${this.apiLink}?action=getPlanTypes`);
  }

  getPlanTypes2(){
    return this.http.get<any>(`${this.apiLink}?action=getPlanTypes2`);
  }

  getPlanPeriod(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getPlanPeriod`);
  }

  getPlanPrices(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getPlanPrices`);
  }

  getAllGroups(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getAllGroups`);
  }

 
  joinFnfPlan(data){
    console.log(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'joinFnfPlan',user_id:data.user_id, group_id: data.group_id}, httpOptions
    )
  }

  saveIndividualPlan(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'saveIndividualPlan',user_id:data.user_id, name: data.name, planid:data.planid, plan_type:data.plan_type, plan_period:data.plan_period,sk:data.sk}, httpOptions
    )
  }
  

  createFnfPlan(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'createFnfPlan',user_id:data.user_id, name: data.name, planid:data.planid, plan_type:data.plan_type, plan_period:data.plan_period}, httpOptions
    )
  }

  saveGroupMember(group_id,data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'saveGroupMember',group_id:group_id, members:data}, httpOptions
    )
  }
  
  searchResult(keyword){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'searchResult', keyword:keyword}, httpOptions
    )
  }

  getFnfPayment(id){
    return this.http.get<any>(`${this.apiLink}/${id}?action=getFnfPayment`);
  }

  getOnePayment(group_id,user_id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'getOnePayment',user_id: user_id, group_id:group_id}, httpOptions
    )
  }

  loanApplication(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { 
        action: 'loanApplication',
        first_name : data.first_name,
        last_name : data.last_name,
        dob : data.date,
        no_of_dependents : data.no_of_dependents,
        home_tel : data.home_tel,
        mobile : data.mobile,
        email : data.email,
        national_insurance_num : data.national_insurance_num,
        house_name_num : data.house_name_num,
        flat_num : data.flat_num,
        street : data.street,
        town : data.town,
        country : data.country,
        years_at_addr : data.years_at_addr,
        city : data.city,
        post_code : data.post_code,
        numbers : data.numbers,
        month_at_addr : data.month_at_addr,
        rent_or_mortgage : data.rent_or_mortgage,
        employee_status : data.employee_status,
        job_title : data.job_title,
        curr_sick_leave : data.curr_sick_leave,
        employer_name : data.employer_name,
        emp_start_date : data.emp_start_date,
        work_tel_num : data.work_tel_num,
        work_office_building_num : data.work_office_building_num,
        work_street : data.work_street,
        work_town : data.work_town,
        work_post_code : data.work_post_code,
        work_country : data.work_country,
        specefic_reason : data.specefic_reason,
        borrow_amount : data.borrow_amount,
        net_income : data.net_income,
        total_owe : data.total_owe,
        pay_saving_freq : data.pay_saving_freq,
        save_amount : data.save_amount,
        repay_amount : data.repay_amount,
        repay_method : data.repay_method,
      }, httpOptions
    )
  }

  getAddress(code){
    return this.http.get<any>(`https://api.getAddress.io/find/${code}?api-key=y_OItl6GTUe3JsEtF5pMgg22403`);
  }

      


}