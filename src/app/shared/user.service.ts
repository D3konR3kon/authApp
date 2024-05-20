import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user_API = 'http://localhost:4000/v1/users/'
  http =  inject(HttpClient)

  constructor() { }

  getAdminAccess():Observable<any>{
    return this.http.get(this.user_API+"admin");
  }
}
