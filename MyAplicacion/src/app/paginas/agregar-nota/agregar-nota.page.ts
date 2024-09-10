import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-nota',
  templateUrl: './agregar-nota.page.html',
  styleUrls: ['./agregar-nota.page.scss'],
})
export class AgregarNotaPage implements OnInit {

  tarea: string = '';  // Captura la descripción de la tarea
  fecha: string = '';  // Captura la fecha seleccionada

  constructor(private router: Router) {}

  registrarTarea() {
    if (this.tarea.trim() && this.fecha) {
      // Obtén las tareas almacenadas
      const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');

      // Agregar la nueva tarea con la fecha
      const nuevaTarea = {
        descripcion: this.tarea,
        fecha: this.fecha
      };
      tareasGuardadas.push(nuevaTarea);

      // Guardar nuevamente la lista de tareas en localStorage
      localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

      // Limpiar los campos
      this.tarea = '';
      this.fecha = '';

      // Navegar a la página de visualización de tareas
      this.router.navigate(['/tareas']);
    }
  }

  cancelar() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
