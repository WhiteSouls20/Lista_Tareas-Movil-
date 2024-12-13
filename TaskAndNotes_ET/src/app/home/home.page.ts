import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { WeatherService } from '../servicios/weather.service';
import { ejemplosI } from 'src/models/tareasDos.models';
import { FirestoreService } from '../servicios/firestore.service';
import { Geolocation } from '@capacitor/geolocation';

import { FormsModule } from '@angular/forms';
import { taskI } from 'src/models/task.models';

import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weatherData: any;

  tareas: any[] = []; // Lista de tareas que se mostrará
  nombreUsuario: string = '';
  // ejemplos: ejemplosI[] = [];

  task: taskI[] = [];
  newTask: taskI;
  
  cargando: boolean = false;

  constructor(private storage : Storage, private weatherService: WeatherService, private firestoreservice: FirestoreService, private authService: AuthService) {
    // this.loadejemplos();

    this.gettask();
    this.loadtask();
    // this.initTask();
    // addIcons({ create: icons ['create'] });
    // addIcons({ create: icons ['trash'] });
  }

  cerrarSesion() {
    this.authService.logout(); // Llama al método de cierre de sesión del servicio
  }

  loadtask(){

    this.firestoreservice.getCollectionChanges<taskI>('Task').subscribe( data=> {

      if (data){
        this.task = data
        
      }

    } )
  }

  initTask() {
    this.newTask = {
      titulo: null,
      descripcion: null,
      estado: null,
      idtasks: this.firestoreservice.createIdDoc()
    }
  }

  // loadejemplos(){

  //   this.firestoreservice.getCollectionChanges<ejemplosI>('Ejemplos').subscribe( data=> {

  //     if (data){
  //       this.ejemplos = data
        
  //     }

  //   } )
  // }

  async save() {
    this.cargando = true;
    await this.firestoreservice.createDocumentID(this.newTask, 'Task', this.newTask.idtasks)
    this.cargando = false;
  }

  edit (task: taskI) {
    this.newTask = task;
  }

  async delete(task:taskI){
    this.cargando = true;
    await this.firestoreservice.deleteDocumentID('Task', task.idtasks);
    this.cargando = false;
  }

  async gettask(){
    const uid = '';
    this.firestoreservice.getDocumentChanges<any>('Task/' + uid).subscribe(data =>{
      console.log('gettask ->', data);
      if (data) {
        
        this.task = data

      }
    })

    const res = await this.firestoreservice.getDocument<any>('Task/' +uid)
    this.task = res.data()
  }

  ionViewWillEnter() {
    // Cargar las tareas guardadas en localStorage al entrar en la página
    this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]').map((tarea: any) => {
      this.loadtask(); 
      if (!tarea.fecha || isNaN(Date.parse(tarea.fecha))) {
        tarea.fecha = new Date().toISOString(); // Fecha actual en formato ISO
      } 
      return tarea;
    });
    this.loadtask();  
  }

  async ngOnInit() {
    await this.storage.create(); // Inicializa el almacenamiento
    this.nombreUsuario = (await this.storage.get('username')) || 'Usuario'; // Recupera el nombre de usuario
    console.log('Nombre de usuario:', this.nombreUsuario);
    this.getUbicacionAndClima();
  }

  async getUbicacionAndClima() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.weatherService.getClimaPorCoordenadas(lat, lon).subscribe({
        next: (data) => {
          console.log('Clima:', data);
          this.weatherData = data;
        },
        error: (err) => {
          console.error('Error al obtener el clima:', err);
        },
      });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

}