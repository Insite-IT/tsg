import { Component, Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  editdata: any;

  loaduserdata(code: any) {
    this.service.GetUserbyCode(code).subscribe(res => {
      this.editdata = res;
      console.log(this.editdata);
      // this.registerform.setValue({
      //   id: this.editdata.id, name: this.editdata.name,
      //   password: this.editdata.password, email: this.editdata.email, gender: this.editdata.gender,
      //   role: this.editdata.role, isactive: this.editdata.isactive
      // });
    });
  }
}
