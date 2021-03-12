import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PhotoPopupComponent } from '../../photo-popup/photo-popup.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private router : ActivatedRoute, public _data: DataService,  public modalController: ModalController) { }
  s = 0;

  id: any;
  photos:any;
  ngOnInit() {

    this.id = this.router.snapshot.paramMap.get('idg');

    this._data.getPostImages(this.id , 0).subscribe(
      res=>{
        this.photos = res;
     
        
      },
      err=>{

      }
    );

  }
  demoPost : any;
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      this.s = this.s + 20;
      this._data.getlatestPost(this.s).subscribe(
        res=>{
          console.log(res);
          
         this.demoPost = res;
         for (var i of this.demoPost) {
          this.photos.push(i);
        }
       
        }
      );

    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


  async presentModal(video: any) {
    
  
  
    const modal = await this.modalController.create({
      component: PhotoPopupComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'image': video,
       

       
      }
    });
    return await modal.present();
  }
}
