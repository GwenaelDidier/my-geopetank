import {Component, Directive , OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { SebmGoogleMap, MapsAPILoader, NoOpMapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'app-my-boulodromes',
  templateUrl: './my-boulodromes.component.html',
  styleUrls: ['./my-boulodromes.component.scss'],
})

export class MyBoulodromesComponent implements OnInit, AfterViewInit {

  public boulodromes: FirebaseListObservable<any[]>;
  public boulodromeIsSelected:boolean=false;

  public index:string;
  public title: string='';
  public ville: string='';
  public departement: number;
  public secteur: string='';
  public type: string='';
  public adresse: string='';
  public latitude: number;
  public longitude: number;
  public nbTerrains: number;
  public couvert:boolean=false;

  public lat: number = 43.3;
  public lng: number = 1.4;

  public showMap:boolean = false;

  public seeBoulodromeModeSolo: boolean = false;
  public recherche: string;

  public statusBoulodromes: string;

  markers: Array<Object> = [];

  @ViewChild('myMap') myMap: any;

  private doFormatBoulodrome(elem){

    elem.latitude = parseFloat(elem.latitude);
    elem.longitude = parseFloat(elem.longitude);
    elem.lat = elem.latitude;
    elem.lng = elem.longitude;
    return elem;
  }

  constructor(af: AngularFire) {
    this.statusBoulodromes = 'loading';
    this.boulodromes = af.database.list('/boulodromes', {
      query: {
        orderByChild: 'nom',
      }
    });

    this.boulodromes
      .subscribe(bou => {
        bou.map(this.doFormatBoulodrome);
        this.markers = bou;
        this.statusBoulodromes = 'active';
    })
  }

  public modifBoulodrome(boulodrome){
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

  public toggleSeeBoulodrome(){

    if(this.seeBoulodromeModeSolo){
      // revient en mode normal
      this.recherche = null;
    }else{
      // passe en mode info
      this.recherche = this.title;
    }
    this.seeBoulodromeModeSolo = !this.seeBoulodromeModeSolo;

  }

  public setViewForm(val){
    this.boulodromeIsSelected = val;
  }

  cancelBoulodrome(){
    this.setViewForm(false);
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
      nbTerrains: this.nbTerrains || 0,
      couvert: this.couvert
    };

    let key = this.index;
    this.boulodromes.update(key, myBoulodrome);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.showMap = true;

  }


}
