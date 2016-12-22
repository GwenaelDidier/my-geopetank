import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-my-toolbar',
  templateUrl: './my-toolbar.component.html',
  styleUrls: ['./my-toolbar.component.css']
})
export class MyToolbarComponent implements OnInit {

  user = {};

  constructor(
    public af: AngularFire
  ) {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        console.log(this.user);
      }
      else {
        // user not logged in
        this.user = {};
      }
    });
  }

  login() {
  	this.af.auth.login({
    	provider: AuthProviders.Google
  	});
	}
 
	logout() {
	  this.af.auth.logout();
	}

	ngOnInit() {
	  }
}
