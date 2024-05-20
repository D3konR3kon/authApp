import { Routes } from '@angular/router';
import { HomeComponent } from './comps/home/home.component';
import { RegisterComponent } from './comps/register/register.component';
import { LoginComponent } from './comps/login/login.component';
import { NavbarComponent } from './comps/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { AdminComponent } from './comps/admin/admin.component';
export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'signup', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent},
    
    {path: '', redirectTo:'home' , pathMatch: 'full'},
    
];
