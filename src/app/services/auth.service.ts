import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "@models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<User>('/users/login', {email, password});
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
}
