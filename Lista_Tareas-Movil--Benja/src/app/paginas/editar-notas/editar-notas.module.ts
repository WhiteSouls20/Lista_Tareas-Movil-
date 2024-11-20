import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarNotasPageRoutingModule } from './editar-notas-routing.module';

import { EditarNotasPage } from './editar-notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarNotasPageRoutingModule
  ],
  declarations: [EditarNotasPage]
})
export class EditarNotasPageModule {}
