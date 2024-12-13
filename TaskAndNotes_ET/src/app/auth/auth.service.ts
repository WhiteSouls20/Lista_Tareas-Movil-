// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
  }

  // Método para verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    const sessionActive = await this.storage.get('SessionID');
    return !!sessionActive;  // Si 'SessionID' existe, significa que el usuario está autenticado
  }

  // Método para iniciar sesión
  async login(email: string, password: string): Promise<boolean> {
    // Aquí deberías validar las credenciales contra un backend o base de datos.
    // Para efectos de ejemplo, supongamos que el login siempre es exitoso si el usuario y contraseña no están vacíos.
    
    if (email && password) {
      // Almacenar información de sesión
      await this.storage.set('SessionID', 'some_unique_session_id');
      await this.storage.set('email', email); // O almacenar información del usuario en el storage
      
      // Redirigir al usuario a la página de inicio o a la página principal
      this.router.navigate(['/home']);
      return true;
    } else {
      return false;
    }
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    await this.storage.remove('SessionID');    
    await this.storage.remove('usuario');      
    this.router.navigate(['/inicio-session']);  // Redirige a la página de inicio de sesión
  }
}

