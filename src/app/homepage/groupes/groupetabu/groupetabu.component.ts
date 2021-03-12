import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-groupetabu',
  templateUrl: './groupetabu.component.html',
  styleUrls: ['./groupetabu.component.scss'],
})
export class GroupetabuComponent implements OnInit {

  constructor(public _data: DataService) { }

  categorie: any;
  groupes: any;
  ngOnInit() {

    this._data.getAllCategorie().subscribe(
      res=>{
        this.categorie = res;
      }
    );


      this.getAllGroupe();

  }

  selected = -1;


  getAllGroupe(){
    this._data.getAllLatestGroupes().subscribe(
      res=>{
        this.groupes = res;
      }
    );
  }


  getGroupeByCategorie(c: string){
    console.log(c);
    
    this._data.getGroupeByCategorie(c).subscribe(
      res=>{
        this.groupes = res;
        console.log(this.groupes);
        
      }
    );
  }

}
