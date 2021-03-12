import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.scss'],
})
export class NotifComponent implements OnInit {

  constructor(public _data: DataService, private _location: Location) { }

  user: any;
  notifications: any;
  notReaded = 0;
  stat = {
    status : true
  }
  ngOnInit() {




    this.user = this._data.getUserData();
/**
 * init notif
 */
    this._data.getUserNotification(this.user._id).subscribe(
      res=>{
       
        this.notifications = res;

      }
    );




    
  }


  back(){
    this._location.back();
  }


  updateUser(idg: any){
    this.user.groupe.indexOf(idg) === -1 ? this.user.groupe.push(idg): null;
     
    
     
     localStorage.setItem('user' , JSON.stringify(this.user));
     this.ngOnInit();
 
   }
   doNothing(){
    
     
   }


   removeGroupeFromUser(id: any){
  
    
    let usr = this.user;
    let ind = usr.groupe.indexOf(id);
    usr.groupe.splice(ind, 1);
    localStorage.setItem('user' ,  JSON.stringify(usr));

  }


 
 

}
