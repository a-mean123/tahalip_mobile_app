import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';


@Component({
  selector: 'app-popupvideo',
  templateUrl: './popupvideo.component.html',
  styleUrls: ['./popupvideo.component.scss'],
})
export class PopupvideoComponent implements OnInit {
  url: SafeResourceUrl;

  constructor(public modalController: ModalController , public sanitizer:DomSanitizer) { }

  @Input() video : any;

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.video.id.videoId); 
   
  }



  
 public dismissModal() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.modalController.dismiss({
    'dismissed': true
  });
}



}
