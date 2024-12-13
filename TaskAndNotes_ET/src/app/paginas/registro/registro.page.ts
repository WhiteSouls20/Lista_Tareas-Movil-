import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  email: string = "";
  usuario: string = "";
  password: string = "";
  repeatpassword: string = "";

  showPassword_1 = false;
  showPassword_2 = false;

  constructor(
    public mensaje: ToastController,
    public alerta: AlertController,
    private router: Router,
    private animationCtrl: AnimationController,
    private storage: Storage,
    private loginFirebase: FirebaseLoginService
  ) {}

  // Alternar visibilidad de contraseña
  togglePasswordVisibility_1() {
    this.showPassword_1 = !this.showPassword_1;
  }

  togglePasswordVisibility_2() {
    this.showPassword_2 = !this.showPassword_2;
  }

  // Mensaje de error
  async MensajeError(errorMessage: string) {
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'No se pudo registrar el usuario',
      message: errorMessage,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  // Mensaje de éxito
  async MensajeCorrecto() {
    const toast = await this.mensaje.create({
      message: '¡Usuario registrado correctamente!',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  // Registrar usuario
  async registrarUsuario() {
    // Validar campos
    if (
      this.email.trim() === "" ||
      this.usuario.trim() === "" ||
      this.password.trim() === "" ||
      this.repeatpassword.trim() === "" ||
      this.password !== this.repeatpassword
    ) {
      const mensajeError =
        this.password !== this.repeatpassword
          ? 'Las contraseñas no coinciden.'
          : 'Todos los campos son obligatorios.';
      this.MensajeError(mensajeError);
      return;
    }

    try {
      // Llamar al servicio para registrar al usuario en Firebase
      await this.loginFirebase.register(this.email, this.password);
      await this.storage.set("usuario", this.usuario);
      console.log("Usuario registrado exitosamente");
      this.MensajeCorrecto();
      this.router.navigate(["/home"]);
    } catch (error: any) {
      console.error("Error al registrar el usuario:", error.message);
      this.MensajeError(this.getFirebaseErrorMessage(error.code));
    }
  }

  // Mapear errores comunes de Firebase a mensajes legibles
  getFirebaseErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil.';
      default:
        return 'Ocurrió un error inesperado. Inténtalo de nuevo.';
    }
  }

  async ngOnInit() {
    await this.storage.create();
  }
}
