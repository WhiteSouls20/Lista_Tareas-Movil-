import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarNotasPage } from './editar-notas.page';

const routes: Routes = [
  {
    path: '',
    component: EditarNotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarNotasPageRoutingModule {}
