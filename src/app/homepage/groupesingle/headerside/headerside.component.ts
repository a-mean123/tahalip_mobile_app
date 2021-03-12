import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-headerside',
  templateUrl: './headerside.component.html',
  styleUrls: ['./headerside.component.scss'],
})
export class HeadersideComponent implements OnInit {

  constructor(private _location: Location) { }

  @Input()  title : string;
  ngOnInit() {}


  back(){
    this._location.back();
  }



}
