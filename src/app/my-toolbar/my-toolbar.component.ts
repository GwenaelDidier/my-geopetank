import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { LocalStorageService } from 'angular-2-local-storage';
import { MdIcon, MdIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-my-toolbar',
  templateUrl: './my-toolbar.component.html',
  styleUrls: ['./my-toolbar.component.css'],
  //directives: [MdIcon],
  providers: [MdIconRegistry]
})
export class MyToolbarComponent implements OnInit {

  user = {};

  constructor(
    public af: AngularFire,
    public localStorageService: LocalStorageService

  ) {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        localStorageService.set('user', this.user);
      }
      else {
        // user not logged in
        this.user = {};
      }
    });

    this.localStorageService = localStorageService;

    if(localStorageService.get('user') != null){
      this.user = localStorageService.get('user');
    }
  }

  loginGoogle() {
  	this.af.auth.login({
    	provider: AuthProviders.Google
  	});
	}
  loginFacebook() {
    this.af.auth.login({
      provider: AuthProviders.Facebook
    });
  }

	logout() {
	  this.af.auth.logout();
    this.localStorageService.remove('user');
	}

	ngOnInit() {


	  }
}
