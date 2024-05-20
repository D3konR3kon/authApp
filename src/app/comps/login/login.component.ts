import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../shared/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  route = inject(Router)


  userForm!: FormGroup;
  isLoginFailed: boolean= true;
  isLoggedIn: boolean = false;
  roles: any;

  constructor(private authService:  AuthService, private tokenStorage: TokenService){
    this.userForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
  
  }

  onSubmit() {
    
    this.authService.login(this.userForm.value).subscribe({
      next: (data)=>{
        this.tokenStorage.saveToken(data.token)
          this.tokenStorage.saveUser(data)
          this.isLoginFailed = false
          this.isLoggedIn = true
          this.roles = this.tokenStorage.getUser().roles
          this.route.navigate(['/admin'])
      },
      error: (err)=>{
        console.error(err.error)
      } 
    })
  }
}
