import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {

  constructor(private menu: MenuController, public _data: DataService) { }

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
        for(let i = 0; i < this.notifications.length; i++){
          if(!this.notifications[i].status){
            this.notReaded ++;
          }
        }
      }
    );



    console.log(this.user);
    setInterval(()=> { 
      this.notReaded = 0;
      this._data.getUserNotification(this.user._id).subscribe(
        res=>{
        
         
          this.notifications = res;
          for(let i = 0; i < this.notifications.length; i++){
            if(!this.notifications[i].status){
              this.notReaded ++;
            }
          }
        }
      );
     },  25000);
    
  }
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  removeGroupeFromUser(id: any){
  
    
    let usr = this.user;
    let ind = usr.groupe.indexOf(id);
    usr.groupe.splice(ind, 1);
    localStorage.setItem('user' ,  JSON.stringify(usr));

  }



  updateUser(idg: any){
   this.user.groupe.indexOf(idg) === -1 ? this.user.groupe.push(idg): null;
    
   
    
    localStorage.setItem('user' , JSON.stringify(this.user));
    this.ngOnInit();

  }
  doNothing(){
   
    
  }


  updateStatusOfNotification(){

    this.notReaded > 0 ? this._data.updateUserNotificationStatus(this.stat , this.user._id).subscribe(
      res=>{
      
        
        this.ngOnInit();
      },
      err=>{
      
        
      }
    ) : null;


  }



}
