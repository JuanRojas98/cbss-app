import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "@models/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post<User>('/users/login', {email, password});
  }

  refreshToken() {
    const token = this.getRefreshToken();
    return this.http.post('/users/refresh', {token});
  }

  getAceessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setAceessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
