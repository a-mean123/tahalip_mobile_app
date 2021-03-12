import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mygroupe',
  templateUrl: './mygroupe.component.html',
  styleUrls: ['./mygroupe.component.scss'],
})
export class MygroupeComponent implements OnInit {


  constructor(public _data: DataService) { }

  categorie: any;
  groupes: any;
  user: any;
  ngOnInit() {

    this.user = this._data.getUserData();

    this._data.getAllCategorie().subscribe(
      res=>{
        this.categorie = res;
      }
    );


      this.getAllGroupe();

  }

  selected = -1;


  getAllGroupe(){
    this._data.getMyGroupe(this.user.groupe).subscribe(
      res=>{
        this.groupes = res;
        console.log(this.groupes);
        
      }
    );
  }


  getGroupeByCategorie(c: string){
    console.log(c);
    
    this._data.getMyGroupeCat(this.user.groupe, c).subscribe(
      res=>{
        this.groupes = res;
        console.log(this.groupes);
        
      }
    );
  }


}
