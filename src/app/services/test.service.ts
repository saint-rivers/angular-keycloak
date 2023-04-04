import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}
  testPublicRoute() {
    return this.http.get(`http://localhost:8080/api/v1/test/public`);
  }
  testAccessToken() {
    return this.http.get(`http://localhost:8080/api/v1/test/private`);
  }
}
