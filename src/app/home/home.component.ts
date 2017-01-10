import { Component, OnInit } from '@angular/core';
import { MdIcon, MdIconRegistry } from '@angular/material/icon';
import { CeiboShare } from 'ng2-social-share';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public repoUrl = 'http://www.geopetank.fr';
  public imageUrl = 'http://www.geopetank.fr/images/boule.gif';

  constructor() {
    //sbService.height = 600; //default: 400
    //sbService.width = 800;  //default: 500
  }

  ngOnInit() {

  }

}
