import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})



export class AuthService {

  auth_API = 'http://localhost:4000/v1/auth/'
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
}
  constructor(private http : HttpClient) { }

  login(body: any): Observable<any>{
    return this.http.post(this.auth_API+'signin', body, this.httpOptions)
  }

  register(body: any): Observable<any>{
    return this.http.post(this.auth_API+'register', body, this.httpOptions)
  }



}
