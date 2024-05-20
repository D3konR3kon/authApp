import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/token.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  authService = inject(AuthService);
  userService = inject(UserService)
  tokenService = inject(TokenService)
  router = inject(Router);
  isLoggedIn = false
  content: any;
  message=""
  roles: any;

  hasAdminAccess = false;

  ngOnInit(): void {
    this.checkRole()
  }

  checkRole(){
    const user = this.tokenService.getUser()

    if(user && user.roles.includes('admin')){
      this.roles = user.roles
      console.log(this.roles)
      
      this.userService.getAdminAccess().subscribe({
      next: (res)=>{
        console.log(res)
        this.content  = res
        this.hasAdminAccess=true
      },
      error: (err)=>{
        console.error("An err here:", err.error)
        this.message=err.error.message || err.error.error
        
      }
    })
  }
  else{

    this.hasAdminAccess=false
    this.message="Unauthorised"
    setTimeout(()=>{
      this.router.navigate(['/login']);
    }, 2000)
      
  }
    }
    

  public logout(){
    this.tokenService.signOut();
    this.router.navigate(['/login']);
    
  }
}
