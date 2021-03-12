import { Component, OnInit, ElementRef , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-usercover',
  templateUrl: './usercover.component.html',
  styleUrls: ['./usercover.component.scss'],
})
export class UsercoverComponent implements OnInit {
  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  constructor(public _data: DataService, private route: ActivatedRoute,
    public alertController: AlertController,
    private router: Router
    
    ) { }

  user: any;
  id:any;
  superUser: any;
  ngOnInit() {
    this.superUser = this._data.getUserData();
    this.id = this.route.snapshot.paramMap.get('id');
    this._data.getUserDataWithId(this.id)
    .subscribe(
      res=>{
        this.user = res;
      }
    );
  }

  
  url : any;


  onAdd(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  }
}






usr : any;

async presentAlertPrompt() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'تغيير الوصف الشخصي',
    inputs: [

     
      {
        name: 'paragraph',
        id: 'paragraph',
        type: 'textarea',
        placeholder: this.user.bio
      },
    
    
    ],
    buttons: [
      {
        text: 'إلغاء',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'تغيير',
        handler: (data) => {
         let bio = {
           bio : data.paragraph
         }
         this._data.updatebio(bio, this.user._id).subscribe(
           res=>{
            this.usr = res;
            console.log(res);
            this.usr.bio = data.paragraph;
            localStorage.setItem('user' , JSON.stringify(this.usr));
            this.ngOnInit();

           }
         );
        }
      }
    ]
  });

  await alert.present();
}

update(){

  const imageBlob = this.fileInput.nativeElement.files[0];
  const file = new FormData();
  file.set('image', imageBlob);
  



  this._data.updatecover(file , this.user._id).subscribe(

    res=>{
      console.log(res);
      
      this.usr = res;
      
      
      localStorage.setItem('user' , JSON.stringify(this.usr));
      this.url = null;
      this.ngOnInit();
                // let currentUrl = this.router.url;
                // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                // this.router.navigate([currentUrl]);
                // });
     
     
    }, 
    err=>{
      console.log(err);
      
      // let currentUrl = this.router.url;
      //           this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      //           this.router.navigate([currentUrl]);
      //           });
     
      
    }
    
  );


}



}
