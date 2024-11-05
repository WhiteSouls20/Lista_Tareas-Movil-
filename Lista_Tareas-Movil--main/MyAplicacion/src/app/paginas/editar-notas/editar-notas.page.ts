import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Tarea {
  id: number;
  descripcion: string;
  descripcionCompleta: string;
  fecha: string;
  foto: string;
}

@Component({
  selector: 'app-editar-notas',
  templateUrl: './editar-notas.page.html',
  styleUrls: ['./editar-notas.page.scss'],
})
export class EditarNotasPage implements OnInit {
  tarea: any = { 
    id: 0,
    descripcion: '',
    descripcionCompleta: '',
    fecha: '',
    foto: '' 
  };
  

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
    const id = Number(params['id']);
    if (id) {
      
      const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
      this.tarea = tareas.find((t:Tarea) => t.id === id) || this.tarea;
      console.log('Tarea cargada:', this.tarea); // Verificar en consola
        if (!this.tarea.fecha || isNaN(Date.parse(this.tarea.fecha))) {
          this.tarea.fecha = new Date().toISOString(); // Fecha actual en formato ISO
        }
      }
    });
  }

  

  async actualizar() {

    if (this.tarea.fecha) {
        this.tarea.fecha = new Date(this.tarea.fecha).toISOString(); 
    }

    const alert = await this.alertController.create({
      header: 'Tarea actualizada',
      buttons: ['OK']
    });
    await alert.present();

    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const index = tareas.findIndex((t:Tarea) => t.id === this.tarea.id);
    if (index !== -1) {
      tareas[index] = this.tarea;  // Sobrescribe la tarea actualizada
      localStorage.setItem('tareas', JSON.stringify(tareas));  // Guarda en localStorage
    }

    this.router.navigate(['/home']);
  }

  async cancelar() {
    const alert = await this.alertController.create({
      header: 'Atencion',
      message: '¿Estás seguro de querer eliminar la tarea? Esta acción es permanente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            
            const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
            const index = tareas.findIndex((t: Tarea)=> t.id === this.tarea.id);
            if (index !== -1) {
              tareas.splice(index, 1); 
              localStorage.setItem('tareas', JSON.stringify(tareas)); 
            }
          
            this.router.navigate(['/home']); 
          }
        }
      ]
    });
    await alert.present();
  }

}
