import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-user',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent implements AfterViewInit {

  constructor(private builder: FormBuilder, private service: AuthService, private dialog: MatDialog, 
    private toastr: ToastrService, private router: Router) {
    this.SetAccessPermission();
  }
  userlist: any;
  dataSource: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;


  ngAfterViewInit(): void {

  }


  LoadUser() {
    this.service.Getall().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  SetAccessPermission() {
    this.service.Getaccessbyrole(this.service.getrole(), 'user').subscribe(res => {
      this.accessdata = res;

      if (this.accessdata.length > 0) {
        this.haveadd = this.accessdata[0].haveadd;
        this.haveedit = this.accessdata[0].haveedit;
        this.havedelete = this.accessdata[0].havedelete;
        this.LoadUser();
      }
      else {
        alert('You are not authorized to access');
        this.router.navigate([''])
      }
    })
  }


  displayedColumns: string[] = ['username', 'name','surname', 'email', 'phone','status', 'role', 'action'];


  updateuser(code: any) {
    if (this.haveedit) {
      this.OpenDialog('1000ms', '600ms', code);
    } else {
      this.toastr.warning("You don't have access for Edit");
    }
  }


  edituser(code: any) {
    if (this.haveedit) {
      this.OpenEditDialog('1000ms', '600ms', code);
      //this.toastr.success("Success");
    } else {
      this.toastr.warning("You don't have access for Edit");
    }
  }


  deleteuser(code: any) {
    if (this.havedelete) {
      this.DeleteUser(code);
    } else {
      this.toastr.warning("You don't have access for Edit");
    }
  }


  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }


  OpenEditDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(EditComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }


  DeleteUser(code:any){
    this.service.deleteuser(code).subscribe(res => {
      console.log(code);
      this.toastr.success("User deleted successfully!");
      this.LoadUser();
    });
    
  }
}
