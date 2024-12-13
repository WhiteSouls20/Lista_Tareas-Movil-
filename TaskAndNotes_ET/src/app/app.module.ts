import { IonicStorageModule } from '@ionic/storage-angular';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),AngularFireAuthModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"proyecto-movil-be631","appId":"1:1076445882942:web:b215215593a3832bafbf6f","storageBucket":"proyecto-movil-be631.firebasestorage.app","apiKey":"AIzaSyCO3uKDoZOp_wbYJXvGRyBwGWAaKnBWtUU","authDomain":"proyecto-movil-be631.firebaseapp.com","messagingSenderId":"1076445882942"})), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
