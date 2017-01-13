import { Directive, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { GoogleMap, Marker } from 'angular2-google-maps/core/services/google-maps-types';
import './markerClusterer.js';

declare const google;
declare const MarkerClusterer;

@Directive({
  selector: 'googlemap-directive'
})

export class GoogleMapDirective {

  googleMarkers : any;
  markersClusterer: any;
  _map: any;

  zoom: number = 3;
  lat: number = 51.673858;
  lng: number = 7.815982;

  @Input() private markers: marker[];

  initMarkers(){
    let i = 0;
    let markers = this.markers;
    var result = [];
    for ( ; i < markers.length; ++i ){
      result.push( new google.maps.Marker({
          position : markers[ i ]
        })
      );
    }
    return result;
  }

  constructor (private gmapsApi: GoogleMapsAPIWrapper) {
    var me = this;
    this.gmapsApi.getNativeMap().then(map => {
      // instance of the map.
      me._map = map;
      me.initializeMap();
    });
  }

  initializeMap(){
    var me = this;
    me.googleMarkers = me.initMarkers();
    if(me._map !== undefined && me.googleMarkers.length > 0){
      if(me.markersClusterer !== undefined && me.markersClusterer !== null){
        me.markersClusterer.clearMarkers();
      }
      me.markersClusterer =  new MarkerClusterer( me._map, me.googleMarkers, { imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m' } );
    }
  }

  ngOnChanges(changes) {
    this.markers = changes.markers.currentValue;
    if(this.markers.length > 0){
      this.googleMarkers = [];
      this.initializeMap();
    }
  }
}

interface marker {
  lat: number;
  lng: number;
}
