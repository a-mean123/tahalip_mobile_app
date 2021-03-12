import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-latests-groupe',
  templateUrl: './latests.component.html',
  styleUrls: ['./latests.component.scss'],
})
export class LatestsComponent implements OnInit {

  constructor(public _data: DataService) { }

  groupes: any;

  ngOnInit() {

    this._data.getlatestGroupe().subscribe(
      res=>{
        this.groupes = res;
      }
    );

  }

}
