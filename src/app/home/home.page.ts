import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tareas: any[] = []; // Lista de tareas que se mostrará
  nombreUsuario : String="";  

  constructor(private storage : Storage) {}

  ionViewWillEnter() {
    // Cargar las tareas guardadas en localStorage al entrar en la página
    this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
  }

  async ngOnInit(){
    await this.storage.create();
    this.nombreUsuario = await this.storage.get("usuario");
  }

}
