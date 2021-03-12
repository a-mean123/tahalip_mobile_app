import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {

  constructor(public _data: DataService, public modalController: ModalController, public router: Router) { }
  @Input() join: any;
  @Input() groupe: any;



  ngOnInit() {}



  test1 = false;
  test2 = false;
  test3 = false;



  joinGroupe(){

    this.test1 = this.join.rep1.length < 2 ? true : false;
    this.test2 = this.join.rep2.length < 2 ? true : false;
    this.test3 = this.join.rep3.length < 2 ? true : false;

    if(this.test1 === this.test2 === this.test3 === false){
    this._data.addJoin(this.join).subscribe(
      res=>{
        console.log('success');
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
        this.dismissModal();
      }
      ,err=>{
        console.log(err);
        
      }
    );
    }



  
  
  }







 public dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
