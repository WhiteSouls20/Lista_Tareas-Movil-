import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Tarea {
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
    descripcion: '',
    descripcionCompleta: '',
    fecha: '',
    foto: '' 
  };
  

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const descripcion = params['descripcion'];
      if (descripcion) {
        
        const tareas: Tarea[] = JSON.parse(localStorage.getItem('tareas') || '[]');
        this.tarea = tareas.find((t: Tarea) => t.descripcion === descripcion) || this.tarea;
        console.log('Tarea cargada:', this.tarea);
        console.log('Foto:', this.tarea.foto);
      }
    });
  }

  

  async actualizar() {
    const alert = await this.alertController.create({
      header: 'Tarea actualizada',
      buttons: ['OK']
    });
    await alert.present();
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
            const index = tareas.findIndex((t: Tarea)=> t.descripcion === this.tarea.descripcion);
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
