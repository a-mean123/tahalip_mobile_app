import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo-popup',
  templateUrl: './photo-popup.component.html',
  styleUrls: ['./photo-popup.component.scss'],
})
export class PhotoPopupComponent implements OnInit {
  constructor(public modalController: ModalController) { }

  @Input() image : any;

  ngOnInit() {
    console.log(this.image);
    
  }



  
 public dismissModal() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.modalController.dismiss({
    'dismissed': true
  });
}

}
