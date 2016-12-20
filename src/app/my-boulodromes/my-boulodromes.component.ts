import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-my-boulodromes',
  templateUrl: './my-boulodromes.component.html',
  styleUrls: ['./my-boulodromes.component.scss']
  
})
export class MyBoulodromesComponent implements OnInit {

	public boulodromes: FirebaseListObservable<any[]>;
	public boulodromeIsSelected:boolean=false;
  	public boulodrome: Object;
  	index:string;
  	title: string='';
  	ville: string='';
  	departement: number;
  	secteur: string='';
  	type: string='';
  	adresse: string='';
  	latitude: number;
  	longitude: number;
  	nbTerrains: number;
  	couvert:boolean=false;

  	constructor(af: AngularFire) {
    	this.boulodromes = af.database.list('/boulodromes');

  	}

  	modifBoulodrome(boulodrome){
  		this.boulodromeIsSelected = true;
  		this.index = boulodrome.$key;
  		this.title = boulodrome.nom;
  		this.ville = boulodrome.ville;
  		this.departement = boulodrome.departement;
  		this.secteur = boulodrome.secteur;
  		this.type = boulodrome.type;
  		this.adresse = boulodrome.adresse;
  		this.latitude = boulodrome.latitude;
  		this.longitude = boulodrome.longitude;
  		this.nbTerrains = (boulodrome.nbTerrains !== undefined ? boulodrome.nbTerrains : null);
  		this.couvert = boulodrome.couvert;
  	}

  	saveBoulodrome(){
  		let myBoulodrome = {
  			nom: this.title,
  			ville: this.ville,
  			departement: this.departement,
  			secteur: this.secteur,
  			adresse:this.adresse,
  			latitude: this.latitude,
  			longitude: this.longitude,
  			nbTerrains: this.nbTerrains,
  			couvert: this.couvert
  		};
  		console.log(this);
  		let key = this.index;
  		this.boulodromes.update(key, myBoulodrome);
  	}

	  ngOnInit() {
	  }

}
