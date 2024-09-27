import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit{

  email : string= ""
  usuario : string = ""
  password : string = ""
  repeatpassword : string = ""

  showPassword_1 = false;
  showPassword_2 = false;
  
  constructor(public mensaje:ToastController,public alerta:AlertController, private router:Router, private animationCtrl: AnimationController, private storage : Storage) {  }

//cambiar visibilidad de la contraseña
  togglePasswordVisibility_1(){
    this.showPassword_1 = !this.showPassword_1;
  }

  togglePasswordVisibility_2(){
    this.showPassword_2 = !this.showPassword_2;
  }

//mensaje de error
  async MensajeError() {
    const alert = await this.alerta.create({
      header: 'Error al iniciar sesion ',
      subHeader: 'Usuario, contraseña incorrecto o con espacios',
      message: 'Error al iniciar sesion en la cuenta, por favor asegurese que ambos campos no esten vacios o con espacios',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

//mensaje de aprobacion
  async MensajeCorrecto() {
    const toast = await this.mensaje.create({
      message: 'Se registro correctamente! ',
      duration: 2000
    });
    toast.present();
  }

//Verifica que los campos no esten vacios ni tengan espacios
  ingresar(){

    const email = this.email || '';
    const usuario = this.usuario || '';
    const password = this.password || '';
    const repeatpassword = this.password || '';


    if (email.trim() ==="" ||
        usuario.trim() === "" || 
        password.trim() === "" || 
        repeatpassword.trim() === "" ||
        email.includes(' ') ||
        usuario.includes(' ') || 
        password.includes(' ') ||
        repeatpassword.includes(' ')){
      console.log("No puede dejar el usuario y constraseña vacios o con espacios")
      this.MensajeError()
    }
    else{
      this.storage.set("usuario", this.usuario)
      console.log("inicio de sesion exitoso ")
      this.MensajeCorrecto()
      this.router.navigate(["/inicio-session"])
      
    }
  }



  async ngOnInit() {
    await this.storage.create();
  }

}