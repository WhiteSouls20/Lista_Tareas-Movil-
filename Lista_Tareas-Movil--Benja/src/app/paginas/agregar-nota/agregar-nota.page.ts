import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-nota',
  templateUrl: './agregar-nota.page.html',
  styleUrls: ['./agregar-nota.page.scss'],
})
export class AgregarNotaPage implements OnInit {

  constructor(private alertController: AlertController) { }

  async registrarTarea() {
    const alert = await this.alertController.create({
      header: 'Tarea guardada con exito',
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
