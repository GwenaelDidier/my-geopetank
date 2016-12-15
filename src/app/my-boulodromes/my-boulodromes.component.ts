import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-my-boulodromes',
  templateUrl: './my-boulodromes.component.html',
  styleUrls: ['./my-boulodromes.component.css']
})
export class MyBoulodromesComponent implements OnInit {

	boulodromes: FirebaseListObservable<any[]>;
  	

  	constructor(af: AngularFire) {
    	this.boulodromes = af.database.list('/boulodromes');

  	}

  	modifBoulodrome(boulodrome){
  		console.log(boulodrome);
  	}

	  ngOnInit() {
	  }

}
