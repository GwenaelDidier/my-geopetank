import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { LocalStorageModule } from 'angular-2-local-storage';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { MyToolbarComponent } from './my-toolbar/my-toolbar.component';
import { MyBoulodromesComponent } from './my-boulodromes/my-boulodromes.component';
import { MyListFilterPipe } from './my-list-filter.pipe';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { ChatComponent } from './chat/chat.component';
import { MyChatServiceService } from './services';
import { HomeComponent } from './home/home.component';
import { ChatMessageFormComponent } from './chat-message-form/chat-message-form.component';
//import { MyAccueilComponent } from './my-accueil/my-accueil.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyAAEzwLMw6x-OrWi3qYBYhN_25PLZlvIAY',
  authDomain: 'my-geopetank.firebaseapp.com',
  databaseURL: "https://my-geopetank.firebaseio.com",
  storageBucket: "my-geopetank.appspot.com",
  messagingSenderId: "474268241358"
};

const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: HomeComponent },
  { path: 'carte', component: MyBoulodromesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MyToolbarComponent,
    MyBoulodromesComponent,
    MyListFilterPipe,
    ChatMessageComponent,
    ChatMessageListComponent,
    ChatComponent,
    HomeComponent,
    ChatMessageFormComponent,
    //MyAccueilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    LocalStorageModule.withConfig({
      prefix: 'my-geopetank',
      storageType: 'localStorage'
    }),
    RouterModule.forRoot(appRoutes),
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA22A2SAxyw75jLPtK2Qd6__g3ctkU14Bk'
    })

  ],
  providers: [MyChatServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
