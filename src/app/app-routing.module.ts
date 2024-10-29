import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EditarNotasPage } from './paginas/editar-notas/editar-notas.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'inicio-session',
    pathMatch: 'full'
  },
  {
    path: 'inicio-session',
    loadChildren: () => import('./paginas/inicio-session/inicio-session.module').then( m => m.InicioSessionPageModule),
    canActivate:[AuthGuard]
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
  {
    path: 'animaciones',
    loadChildren: () => import('./animaciones/animaciones.module').then( m => m.AnimacionesPageModule)
  },
  {
    path: 'animaciones',
    loadChildren: () => import('./paginas/animaciones/animaciones.module').then( m => m.AnimacionesPageModule)
  },
  {
    path: 'animacion',
    loadChildren: () => import('./paginas/animacion/animacion.module').then( m => m.AnimacionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'editar-notas',
    component: EditarNotasPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
