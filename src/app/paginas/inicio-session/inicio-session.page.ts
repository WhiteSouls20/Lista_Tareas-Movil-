import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource }from '@capacitor/camera';
//import para usar camara
import { defineCustomElements} from '@ionic/pwa-elements/loader';
defineCustomElements(window)
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.page.html',
  styleUrls: ['./inicio-session.page.scss'],
})
export class InicioSessionPage implements OnInit{


  async tomarFoto(){
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source:CameraSource.Camera,
      quality:100,
    })
    console.log(image.webPath);
  }


  async obtenerUbicacion(){
    const coordenadas = await Geolocation.getCurrentPosition();
    console.log('Latitud ==>', coordenadas.coords.latitude);
    console.log('Longitud==>', coordenadas.coords.longitude);
  }


  usuario : string =""
  password : string = ""
  showPassword = false;

  
  constructor(public mensaje:ToastController,public alerta:AlertController, private router:Router, private animationCtrl: AnimationController) { 
    this.obtenerUbicacion();
   }

//cambiar visibilidad de la contraseña
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
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
      message: 'Iniciaste sesion de manera exitosa! ',
      duration: 2000
    });
    toast.present();
  }

//Verifica que los campos no esten vacios ni tengan espacios
  ingresar(){
    const usuario = this.usuario || '';
    const password = this.password || '';
    if (usuario.trim() === "" || password.trim() === "" || usuario.includes(' ') || password.includes(' ')){
      console.log("No puede dejar el usuario y constraseña vacios o con espacios")
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