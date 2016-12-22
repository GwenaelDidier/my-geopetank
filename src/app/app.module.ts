import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
//import { LayoutModule } from 'ng2-flex-layout';

import { AppComponent } from './app.component';
import { MyToolbarComponent } from './my-toolbar/my-toolbar.component';
import { MyBoulodromesComponent } from './my-boulodromes/my-boulodromes.component';
import { MyListFilterPipe } from './my-list-filter.pipe';
//import { MyAccueilComponent } from './my-accueil/my-accueil.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCemkIWie5i2g33Z4D6B12rIkfCJlYT-bg',
  authDomain: 'polymer-geopetank.firebaseapp.com',
  databaseURL: 'https://polymer-geopetank.firebaseio.com',
  storageBucket: ''
};

@NgModule({
  declarations: [
    AppComponent,
    MyToolbarComponent,
    MyBoulodromesComponent,
    MyListFilterPipe,
    //MyAccueilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
    //LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
