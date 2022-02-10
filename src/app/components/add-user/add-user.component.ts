import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  form: FormGroup = new FormGroup({
    user_username: new FormControl(''),
    user_password: new FormControl(''),
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    department: new FormControl(''),
  });

  submitted = false;
  data: any ;

  public errors:any=null;
  public successMsg:any=null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        user_username: ['',       [ Validators.required,]],
        user_password : ['',      [ Validators.required,
                                    Validators.minLength(6),
                                    Validators.maxLength(40)]],
        contact_email: ['',       [ Validators.required, Validators.email]],
        contact_first_name: ['',  [ Validators.required,]],
        contact_last_name: ['',   [ Validators.required,]],
        contact_phone: ['',       [ Validators.required ]],
        contact_address1: ['',    [ Validators.required ]],
        contact_department: ['',  [ Validators.required ]],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errors=null;
    this.successMsg=null;

    if (this.form.invalid) {
      return;
    }

   this.authService.add_user(this.form.value).subscribe(
      (result) => {
        this.successMsg = result;
        setTimeout(() => {this.router.navigateByUrl("users")}, 1500);
        console.log(this.successMsg);
      },
      (error) => {
        this.errors = error.error.message;
      }
    );
    console.log(this.form.value);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
    this.router.navigateByUrl('users');
  }


}
