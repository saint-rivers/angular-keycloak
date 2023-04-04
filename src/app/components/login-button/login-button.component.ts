import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent {
  isLoggedIn = false;
  userProfile: any = {};
  output: any[] = [];

  constructor(
    private readonly keycloak: KeycloakService,
    private readonly testService: TestService
  ) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      const token = await this.keycloak.getToken();
      localStorage.setItem('kc_accessToken', token);
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  fetchPublicRoute() {
    this.testService.testPublicRoute().subscribe((res) => {
      this.output.push(res);
    });
  }

  fetchProtectedRoute() {
    this.testService.testAccessToken().subscribe({
      next: (res) => {
        this.output.push(res);
      },
      error: (err) => {
        this.output.push(err);
      },
      complete: () => {
        console.log('done');
      },
    });
  }

  clearOutput() {
    this.output = [];
  }
}
