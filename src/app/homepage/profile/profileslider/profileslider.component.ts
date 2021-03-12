import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profileslider',
  templateUrl: './profileslider.component.html',
  styleUrls: ['./profileslider.component.scss'],
})
export class ProfilesliderComponent implements OnInit {

  constructor(public _data: DataService, private router : ActivatedRoute) { }


  groupes: any;
  user: any;
  superUser: any;
  id:any;
  ngOnInit() {
    this.superUser = this._data.getUserData();
    this.id = this.router.snapshot.paramMap.get('id');
    this._data.getUserDataWithId(this.id)
    .subscribe(
      res=>{
        this.user = res;
        this.refresh();
      }
    );
    
  }

  refresh(){
    this._data.getMyGroupe(this.user.groupe).subscribe(
      res=>{
        this.groupes = res;
        console.log(this.groupes);
        
      }
    );
  }

}
