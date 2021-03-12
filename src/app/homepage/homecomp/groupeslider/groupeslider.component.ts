import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-groupeslider',
  templateUrl: './groupeslider.component.html',
  styleUrls: ['./groupeslider.component.scss'],
})
export class GroupesliderComponent implements OnInit {

  constructor(public _data: DataService) { }


  groupes: any;

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this._data.getAllLatestGroupes().subscribe(
      res=>{
        this.groupes = res;
        console.log(this.groupes);
        
      },
      err=>{
        console.log(err);
        
      }
    );
  }

}
