import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';  // Asumiendo que tienes un servicio de autenticación

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {
    // Redirige a inicio-session si no está autenticado, o a home si está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/inicio-session']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
