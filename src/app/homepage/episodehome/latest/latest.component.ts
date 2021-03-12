import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupvideoComponent } from '../popupvideo/popupvideo.component';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {

  @Input() videos: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}




  async presentModal(video: any) {
    
  
  
    const modal = await this.modalController.create({
      component: PopupvideoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'video': video,
       

       
      }
    });
    return await modal.present();
  }

}
