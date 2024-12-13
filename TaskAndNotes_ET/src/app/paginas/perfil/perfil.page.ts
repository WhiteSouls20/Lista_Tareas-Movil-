// perfil.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  constructor(private authService: AuthService) {}

  cerrarSesion() {
    this.authService.logout(); // Llama al método de cierre de sesión del servicio
  }

  ngOnInit() {}
}
