import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { taskI } from 'src/models/task.models';

@Component({
  selector: 'app-editar-notas',
  templateUrl: './editar-notas.page.html',
  styleUrls: ['./editar-notas.page.scss'],
})
export class EditarNotasPage implements OnInit {
  tarea: taskI = {
    idtasks: '',
    titulo: '',
    descripcion: '',
    estado: '',
    fecha: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        // Cargar tarea desde Firestore
        this.firestoreService.getDocumentChanges<taskI>(`Task/${id}`).subscribe((task) => {
          if (task) {
            this.tarea = task;
            this.tarea.idtasks = id; // Mantener el ID para actualizaciones
          }
        });
      }
    });
  }

  async actualizar() {
    try {
      // Actualizar tarea en Firestore
      await this.firestoreService.updateDocumentID(this.tarea, 'Task', this.tarea.idtasks);

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Tarea actualizada correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      this.router.navigate(['/home']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo actualizar la tarea.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async cancelar() {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Estás seguro de querer eliminar la tarea? Esta acción es permanente.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              // Eliminar tarea de Firestore
              await this.firestoreService.deleteDocumentID('Task', this.tarea.idtasks);
              this.router.navigate(['/home']);
            } catch (error) {
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'No se pudo eliminar la tarea.',
                buttons: ['OK'],
              });
              await errorAlert.present();
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
