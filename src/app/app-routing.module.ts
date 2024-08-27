import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio-session',
    loadChildren: () => import('./paginas/inicio-session/inicio-session.module').then( m => m.InicioSessionPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'editar-notas',
    loadChildren: () => import('./paginas/editar-notas/editar-notas.module').then( m => m.EditarNotasPageModule)
  },
  {
    path: 'agregar-nota',
    loadChildren: () => import('./paginas/agregar-nota/agregar-nota.module').then( m => m.AgregarNotaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
