import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource }from '@capacitor/camera';
//import para usar camara
import { defineCustomElements} from '@ionic/pwa-elements/loader';
defineCustomElements(window)
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { Storage } from '@ionic/storage-angular';

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


  email : string =""
  password : string = ""
  showPassword = false;

  
  constructor(public mensaje:ToastController,public alerta:AlertController, private router:Router, private animationCtrl: AnimationController, private loginFirebase:FirebaseLoginService, private storage:Storage) { 
    this.obtenerUbicacion();
    this.initStorage().then(() =>{
      console.log('Storage inicializado');
    });
   }

   async initStorage(){
    await this.storage.create();
   }

  ngOnInit(): void {
 
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
  if (this.email ==="" || this.password ===""){
    console.log("No puede haber valores vacios")
    this.MensajeError
  }
  else{
    this.loginFirebase.login(this.email,this.password).then(()=>{
      this.storage.set("SessionID", true)
      console.log("Inicios de sesion exitoso")
      this.MensajeCorrecto()
      this.router.navigate(["/home"])
    }).catch(()=>{
      console.log("error al iniciar session")
      this.MensajeError();
    })
  }
}


async MensajeErrorPersonalizado(mensaje: string) {
  const alert = await this.alerta.create({
    header: 'Error al iniciar sesión',
    message: mensaje,
    buttons: ['Aceptar']
  });
  await alert.present();
}


}