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
import { CeiboShare } from 'ng2-social-share';
import { LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ResponsiveModule } from 'ng2-responsive';
import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { MyToolbarComponent } from './my-toolbar/my-toolbar.component';
import { MyBoulodromesComponent } from './my-boulodromes/my-boulodromes.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { ChatMessageFormComponent } from './chat-message-form/chat-message-form.component';
import { MyConcoursComponent } from './my-concours/my-concours.component';

// Services
import { MyChatServiceService } from './services';

// Pipes
import { MyListFilterPipe } from './pipes/my-list-filter.pipe';
import { MyConcoursListDisplayedPipe } from './pipes/my-concours-list-displayed.pipe';

// Directives
import { GoogleMapDirective } from './directives/googlemap-directive.directive';

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
  { path: 'carte', component: MyBoulodromesComponent },
  { path: 'concours', component: MyConcoursComponent }
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
    GoogleMapDirective,
    CeiboShare,
    MyConcoursComponent,
    MyConcoursListDisplayedPipe
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
    }),
    FlexLayoutModule.forRoot(),
    ResponsiveModule

  ],
  providers: [MyChatServiceService, {provide: LOCALE_ID, useValue: "fr-FR"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
