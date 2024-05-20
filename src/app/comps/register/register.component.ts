import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { TokenService } from '../../shared/token.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // route = inject(Router)


  userForm!: FormGroup;
  isLoginFailed: boolean= true;
  isLoggedIn: boolean = false;
  roles: any;
  isSuccessful: boolean =false;
  isSignUpFailed: boolean = true;
  errorMessage: any;
  message = ""


  constructor(private authService:  AuthService, private tokenStorage: TokenService, private route : Router){
    this.userForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  
  
  onSubmit() {
    console.log(this.userForm)
    this.authService.register(this.userForm.value)
    .subscribe({
      next: data => {
        console.log(data)
        this.isSuccessful = true
        this.isSignUpFailed = false
        this.message = data.message
        setTimeout(()=>{
          this.route.navigate(['/login'])
        }, 3000)
        
      },
      error: err => {
        this.errorMessage = err.error.message
        this.isSignUpFailed = true
      }
    })

  }

}
