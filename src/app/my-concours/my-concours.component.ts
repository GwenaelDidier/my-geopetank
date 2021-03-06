import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-concours',
  templateUrl: './my-concours.component.html',
  styleUrls: ['./my-concours.component.scss']
})
export class MyConcoursComponent implements OnInit, AfterViewInit {

  public showMap:boolean = false;
  public lat: number = 43.3;
  public lng: number = 1.4;

  // initialisation du marker
  public markerInfoLatitude:number;
  public markerInfoLongitude:number;
  public modeInfoEnabled:Boolean=false;
  public lastIndexSelected:number;

  public statusConcours: string;
  public myConcoursFirebase: FirebaseListObservable<any[]>;
  public myBoulodromesFirebase: FirebaseListObservable<any[]>;
  public myConcours:Array<any>;
  public myBoulodromes:Array<any>;

  // initialisation des switchs
  public toggleSecteurToulouse:Boolean = true;
  public toggleSecteurGls:Boolean = true;
  public toggleSecteurPibrac:Boolean = true;
  public toggleSecteurGrenade:Boolean = true;
  public toggleSecteurCarbonne:Boolean = true;
  public toggleSecteurMuret:Boolean = true;
  public toggleSecteurVallees:Boolean = true;
  public toggleFormationDoublette:Boolean = true;
  public toggleFormationDoubletteMixte:Boolean = true;
  public toggleFormationDoubletteFeminin:Boolean = true;
  public toggleFormationTriplette:Boolean = true;
  public toggleFormationTripletteMixte:Boolean = true;
  public toggleFormationTeteATete:Boolean = true;
  public toggleFormationTeteATeteFeminin:Boolean = true;

  // initilisation su slider pour le nombre de jours
  public nbJours:number = 14;

  @ViewChild('myMap') myMap: any;


  /**
   * doFormatDate
   * @param elem
   * @returns {any}
   */
  private doFormatDate(elem){
    // set display to true
    elem.displayIt = true;
    elem.dateDisplayIt = true;

    elem.date = Date.parse(elem.date);
    return elem;
  }

  /**
   * @name filtreDatesConcours
   * @param nbJours
   */
  private filtreDatesConcours(nbJours){
    let today = new Date();
    let dateFin = new Date(today.getTime() + nbJours*24*60*60*1000);
    this.myConcours.map(concours => concours.dateDisplayIt = true);
    for(let c in this.myConcours){
      if(this.myConcours[c].date > dateFin.getTime()){
        this.myConcours[c].dateDisplayIt = false;
      }
    }
  }

  /**
   * @name getIconFormation
   * @description appele par le template HTML
   * @param formation
   * @returns {string}
   */
  public getIconFormation(formation){

    let urlImage:String;
    let _prefix:String = '../../assets/images/';

    switch (formation){

      case 'D':
        urlImage = 'icon-doublette.png';
        break;

      case 'DM':
        urlImage = 'icon-doublettemixte.png';
        break;

      case 'DF':
        urlImage = 'icon-doublettefeminin.png';
        break;

      case 'T':
        urlImage = 'icon-triplette.png';
        break;

      case 'T JP':
        urlImage = 'icon-triplette.png';
        break;

      case 'TM':
        urlImage = 'icon-triplettemixte.png';
        break;

      case 'TT':
        urlImage = 'icon-teteatete.png';
        break;

      case 'TTF':
        urlImage = 'teteatetefeminin.png';
        break;

    }

    return _prefix + '' + urlImage;
  }

  public getSecteurConcours(secteur){

    let mySecteur:String;
    secteur = secteur.toLowerCase();
    switch(secteur){

      case 'toulouse':
        mySecteur = 'TOU';
        break;
      case 'gls':
        mySecteur = 'GLS';
        break;
      case '4 vallees':
        mySecteur = '4 VAL';
        break;
      case 'pibrac':
        mySecteur = 'PIB';
        break;
      case 'carbonne':
        mySecteur = 'CAR';
        break;
      case 'muret':
        mySecteur = 'MUR';
        break;
      case 'grenade':
        mySecteur = 'GRE';
        break;
    }

    return mySecteur;
  }

  public  getFormation(formation){
    let myFormation:String;

    switch (formation){

      case 'D':
        myFormation = 'doublette';
        break;

      case 'DM':
        myFormation = 'doublette mixte';
        break;

      case 'DF':
        myFormation = 'doublette féminin';
        break;

      case 'T':
        myFormation = 'triplette';
        break;

      case 'T JP':
        myFormation = 'triplette provencal';
        break;

      case 'TM':
        myFormation = 'triplette mixte';
        break;

      case 'TT':
        myFormation = 'tete a tete';
        break;

      case 'TTF':
        myFormation = 'tete a tete feminin';
        break;
    }
    return myFormation;
  }

  public getTypeConcours(typeC){

    let myType:String;
    switch(typeC){

      case 'P':
        myType = 'en Poule';
        break;

      case '4P':
        myType = 'en 4 Parties';
        break;

      case '':
        myType = '';
        break;

      default:
        myType = '';
        break;
    }

    return myType;
  }

  public getConcoursFiltered(source_, sourceValue_, value_){

    for(let i=0; i < this.myConcours.length; i++){
      if( typeof this.myConcours[i][source_] === 'string'){
        if( this.myConcours[i][source_].toLowerCase() === sourceValue_.toLowerCase()){
          this.myConcours[i].displayIt = value_;
        }
      }
    }
  }

  public prepareFilter(event){
    let mySource:String;
    let mySourceValue:String;
    let regexp = /([a-z]*)([a-zA-Z]*)/;

    let results = regexp.exec(event.source.name);

    if(event.source.name === 'secteurVallees'){
      mySource = 'secteur';
      mySourceValue = '4 vallees';
    }else{
      mySource = results[1].toLowerCase();
      mySourceValue = results[2].toLowerCase();
    }
    this.getConcoursFiltered(mySource, mySourceValue, event.checked);
  }

  public prepareFormationFilter(event){

    let mySource:String = 'formation';
    let mySourceValue:String;


    switch(event.source.name){

      case 'formationDoublette':
        mySourceValue = 'd';
        break;
      case 'formationDoubletteMixte':
        mySourceValue = 'dm';
        break;

      case 'formationDoubletteFeminin':
        mySourceValue = 'df';
        break;
      case 'formationTriplette':
        mySourceValue = 't';
        break;
      case 'formationTripletteMixte':
        mySourceValue = 'tm';
        break;
      case 'formationTeteATete':
        mySourceValue = 'tt';
        break;
      case 'formationTeteATeteFeminin':
        mySourceValue = 'ttf';
        break;
    }

    this.getConcoursFiltered(mySource, mySourceValue, event.checked);
  }

  public voirConcoursMap(club, index){

    club = club.replace('-',' ');

    if(this.lastIndexSelected === undefined || this.lastIndexSelected === null){
      for(let b in this.myBoulodromes){
        if(this.myBoulodromes[b].nom.toLowerCase() === club.toLowerCase()){
          this.markerInfoLatitude = parseFloat(this.myBoulodromes[b].latitude);
          this.markerInfoLongitude = parseFloat(this.myBoulodromes[b].longitude);
          this.modeInfoEnabled = true;
          this.lastIndexSelected = index;
          break;
        }
      }
    }else{
      if(this.lastIndexSelected === index){
        this.markerInfoLatitude = null;
        this.markerInfoLongitude = null;
        this.modeInfoEnabled = false;
        this.lastIndexSelected = null;
      }else{
        this.lastIndexSelected = null;
        this.voirConcoursMap(club, index);
      }
    }
  }




  public onChangeNbJours(){
    this.filtreDatesConcours(this.nbJours);
  }

  constructor(af: AngularFire) {

    this.statusConcours = 'loading';
    this.myConcoursFirebase = af.database.list('/concours/officiels');


    this.myConcoursFirebase
      //.map(this.doFormatDate)
      .subscribe(concours => {
        concours.map(this.doFormatDate);
        this.myConcours = concours;
        this.filtreDatesConcours(this.nbJours);
        this.statusConcours = 'active';
      });

    this.myBoulodromesFirebase = af.database.list('/boulodromes', {
      query: {
        orderByChild: 'nom',
      }
    });

    this.myBoulodromesFirebase
      .subscribe(boulodromes => {
         this.myBoulodromes = boulodromes;
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showMap = true;
  }

}
