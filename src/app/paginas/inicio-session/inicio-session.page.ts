import {Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.page.html',
  styleUrls: ['./inicio-session.page.scss'],
})
export class InicioSessionPage implements OnInit{
  usuario : string =""
  password : string = ""

  //private animation: Animation;
  constructor(public mensaje:ToastController,public alerta:AlertController, private router:Router, private animationCtrl: AnimationController) {  }



  async MensajeError() {
    const alert = await this.alerta.create({
      header: 'Error al iniciar sesion ',
      subHeader: 'Usuario o contraseña incorrecto',
      message: 'Error al iniciar sesion en la cuenta',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  async MensajeCorrecto() {
    const toast = await this.mensaje.create({
      message: 'Iniciaste sesion de manera exitosa! ',
      duration: 2000
    });
    toast.present();
  }

  ingresar(){
    if (this.usuario ==="" || this.password==="" ){
      console.log("No puede dejar el usuario y constraseña vacios ")
      this.MensajeError()
    }
    else{
      console.log("inicio de sesion exitoso ")
      this.MensajeCorrecto()
      this.router.navigate(["/home"])
      
    }
  }


  ngOnInit() {
  }

}