import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tareas: any[] = []; // Lista de tareas que se mostrará

  constructor() {}

  ionViewWillEnter() {
    // Cargar las tareas guardadas en localStorage al entrar en la página
    this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
  }

}
