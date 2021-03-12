import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { GroupefeedComponent } from './groupefeed/groupefeed.component';

@Component({
  selector: 'app-groupesingle',
  templateUrl: './groupesingle.component.html',
  styleUrls: ['./groupesingle.component.scss'],
})
export class GroupesingleComponent implements OnInit {


  constructor(private router : ActivatedRoute ,
     private _data: DataService ,
     private route: Router,
    ) { }

  
  groupe: any;
  user: any;
  id: any;
  join: any;
  status  = false;


  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
     
      event.target.complete();
    }, 1000);
  }



  ngOnInit() {

  this.user = this._data.getUserData();  

  this.router.paramMap.subscribe(
    paramMap=>{
      if(!paramMap.has('id')){
        return;
      }

      this.id =paramMap.get('id');

      this._data.getGroupeById(this.id).subscribe(
        res=>{
          this.groupe = res;
         
         this._data.getjoinbyusergroupe(this.user._id, this.groupe._id).subscribe(
          res=>{
            this.join = res;
            this.status = this.join?.status;
            console.log(this.join);
            
          },
        );
        },
        err=>{
          console.log(err);
          
        }
      );

    }
  );


 

  }

}
