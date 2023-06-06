import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../User.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:3000/user';
  daapiurl='http://localhost:3000/da';

  RegisterUser(userdata:any){
    return this.http.post(this.apiurl,userdata)
  }
  GetUserbyCode(id:string){
    return this.http.get<User>(this.apiurl+'/'+id);
  }
  Getall(){
    return this.http.get(this.apiurl);
  }
  updateuser(id:any,userdata:any){
    return this.http.put(this.apiurl+'/'+id,userdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer(){
    return this.http.get('http://localhost:3000/customer');
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }
  deleteuser(id:any){
    return this.http.delete(this.apiurl+'/'+id);
  }
  edituser(id:any,userdata:any){
    return this.http.put(this.apiurl+'/'+id,userdata);
  }
  GetAllAnalysts(){
    return this.http.get(this.daapiurl);
  }
  // deleteanalyst(id:any){
  //   return this.http.delete(this.custapiurl+'/'+id);
  // }
}
