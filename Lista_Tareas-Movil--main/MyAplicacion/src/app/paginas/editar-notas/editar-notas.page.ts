import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-notas',
  templateUrl: './editar-notas.page.html',
  styleUrls: ['./editar-notas.page.scss'],
})
export class EditarNotasPage implements OnInit {

  constructor(private alertController: AlertController) { }

  async actualizar() {
    const alert = await this.alertController.create({
      header: 'Tarea actualizada',
      buttons: ['OK']
    });
    await alert.present();
  }

  async cancelar() {
    const alert = await this.alertController.create({
      header: 'Tarea cancelada con exito',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
