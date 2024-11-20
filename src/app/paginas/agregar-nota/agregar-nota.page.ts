import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource }from '@capacitor/camera';
//import para usar camara
import { defineCustomElements} from '@ionic/pwa-elements/loader';
defineCustomElements(window)
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-agregar-nota',
  templateUrl: './agregar-nota.page.html',
  styleUrls: ['./agregar-nota.page.scss'],
})
export class AgregarNotaPage implements OnInit {

  tarea: string = '';  // Captura la descripción de la tarea
  fecha: string = '';  // Captura la fecha seleccionada
  foto: string = ''; //Captura el webPath de la foto


  constructor(private router: Router) {}

  
  async tomarFoto(){
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.foto = image.webPath || '';
    console.log("Foto capturada:", this.foto);
  }


  async obtenerUbicacion(){
    const coordenadas = await Geolocation.getCurrentPosition();
    console.log('Latitud ==>', coordenadas.coords.latitude);
    console.log('Longitud==>', coordenadas.coords.longitude);
  }


  registrarTarea() {
    if (this.tarea.trim() && this.fecha) {
      // Obtén las tareas almacenadas
      const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');

      // Agregar la nueva tarea con la fecha
      const nuevaTarea = {
        descripcion: this.tarea,
        fecha: this.fecha,
        foto: this.foto
      };
      tareasGuardadas.push(nuevaTarea);

      // Guardar nuevamente la lista de tareas en localStorage
      localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

      // Limpiar los campos
      this.tarea = '';
      this.fecha = '';
      this.foto = '';

      // Navegar a la página de visualización de tareas
      this.router.navigate(['/home']);
    }
  }

  cancelar() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
