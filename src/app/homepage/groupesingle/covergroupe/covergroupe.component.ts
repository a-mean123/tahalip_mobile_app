import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PopupComponent } from '../popup/popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupesingleComponent } from '../groupesingle.component';

@Component({
  selector: 'app-covergroupe',
  templateUrl: './covergroupe.component.html',
  styleUrls: ['./covergroupe.component.scss'],
})
export class CovergroupeComponent implements OnInit {

  @Input() id: any;

  constructor(public _data: DataService, 
    public modalController: ModalController , 
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    public groupeSingle: GroupesingleComponent
    ) { }

mb: any;

  join = {
    membreId : '',
    groupeId : '',
    status : false,
    rep1: '',
    rep2: '',
    rep3: '' 
  }
  idg: any;
  groupe: any;
  joined = false;
  jj : any;
  user: any;
  founder : any;

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
    
      event.target.complete();
    }, 1000);
  }




  async presentAlertConfirm(id: any, idg: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
    
      message: 'هل انت متاكد من مغادرة المجموعة',
      buttons: [
        {
          text: 'لا',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'نعم',
          handler: () => {
            this._data.deleteJoin(id).subscribe(
              res=>{
                let usr = this.user;
                let ind = usr.groupe.indexOf(idg);
                usr.groupe.splice(ind, 1);
                let gr = {
                  groupe: usr.groupe
                }
                this._data.updategroupe(gr , this.user._id).subscribe(
                  res=>{
                    localStorage.setItem('user' ,  JSON.stringify(usr));
                    let currentUrl = this.router.url;
                    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([currentUrl]);
                    });
                  }
                );
               
              }
            );
            
          }
        }
      ]
    });
  
    await alert.present();
  }




 async ngOnInit() {

    this.user = await this._data.getUserData();
    this.idg = this.route.snapshot.paramMap.get('id');

    this._data.getGroupeMembre(this.idg).subscribe(
      res=>{
        this.mb = res;
      }
    );

    this._data.getGroupeById(this.idg).subscribe(
      res=>{
        this.groupe = res;
        console.log(this.groupe);
        
        this._data.getjoinbyusergroupe(this.user?._id, this.groupe?._id).subscribe(
          res=>{
           console.log('hhhhhhhhhhhhhhhhhhh',res);
           
           this.jj = res;
            if(this.jj){
              this.joined = true;
            }else{
              this.joined = false;
            }
          }
        );


          this._data.getGroupeFounder(this.groupe.founder).subscribe(
            res=>{
              this.founder = res;
              console.log('hhhhhhhhhhhhhhhhhh',this.founder);
              
            }
          );


      }
    );

  }


  async presentModal() {
    this.join.groupeId = this.groupe._id;
    this.join.membreId = this.user._id;
  
  
    const modal = await this.modalController.create({
      component: PopupComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'join': this.join,
        'groupe': this.groupe,

       
      }
    });
    return await modal.present();
  }








}
