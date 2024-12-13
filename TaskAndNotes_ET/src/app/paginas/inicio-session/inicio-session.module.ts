import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSessionPageRoutingModule } from './inicio-session-routing.module';

import { InicioSessionPage } from './inicio-session.page';
import { ShareModule } from 'src/app/modulos/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSessionPageRoutingModule,
    ShareModule
  ],
  declarations: [InicioSessionPage]
})
export class InicioSessionPageModule {}
