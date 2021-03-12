import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { PhotoPopupComponent } from '../photo-popup/photo-popup.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public _data: DataService , private router : ActivatedRoute,  public alertController: AlertController,  public modalController: ModalController) { }
  questionSliderIndex = 0;

  questions: any;
  showComment= false;
  selectedPost = -1;
  superUser : any;
  showNormalComment = true;
  
  ngOnInit() {

    
    this._data.getAllQuestion().subscribe(
      res=>{
        this.questions = res;
        console.log(this.questions);
        
      }
    );


    this.superUser = this._data.getUserData();
  }





  s = 0;
  categorie: any;
  posts: any;
  id: any;
  user: any;
  
  comments: any;
  
  comment = {

    postId: '',
    authorId: '',
    commentId: '' ,
    image: '',
    text: '',
    like: 0


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




  like(i: any, ind: any){
    this.removedislike(i, ind);
    this.questions[ind]?.responses[i].like.push(this.superUser._id);

    let likes = this.questions[ind]?.responses[i].like;

    this._data.likeResponse(likes , this.questions[ind]?.responses[i]._id).subscribe();
    

  }

  dislike(i: any , ind: any){
    let index = this.questions[ind]?.responses[i].like.indexOf(this.superUser._id);

    this.questions[ind]?.responses[i].like.splice(index , 1);

    this._data.likeResponse(this.questions[ind]?.responses[i].like , this.questions[ind]?.responses[i]._id).subscribe();
  }





  adddislike(i: any , ind: any){
    this.dislike(i, ind);
    this.questions[ind]?.responses[i].dislike.push(this.superUser._id);

    let likes = this.questions[ind]?.responses[i].dislike;

    this._data.dislikeResponse(likes , this.questions[ind]?.responses[i]._id).subscribe();
    

  }

  removedislike(i: any , ind: any){
    let index = this.questions[ind]?.responses[i].dislike.indexOf(this.superUser._id);

    this.questions[ind]?.responses[i].dislike.splice(index , 1);

    this._data.dislikeResponse(this.questions[ind]?.responses[i].dislike , this.questions[ind]?.responses[i]._id).subscribe();
  }




  likecm(i: any){
    this.removedislikecm(i);
    this.questions[i]?.like.push(this.superUser._id);

    let likes = this.questions[i]?.like;

    this._data.likeQuestion(likes , this.questions[i]?._id).subscribe();
    

  }

  dislikecm(i: any){
    let index = this.questions[i]?.like.indexOf(this.superUser._id);

    this.questions[i]?.like.splice(index , 1);

    this._data.likeQuestion(this.questions[i]?.like , this.questions[i]?._id).subscribe();
  }


  adddislikecm(i: any){
    this.dislikecm(i);
    this.questions[i]?.dislike.push(this.superUser._id);

    let likes = this.questions[i]?.dislike;

    this._data.dislikeQuestion(likes , this.questions[i]?._id).subscribe();
    

  }

  removedislikecm(i: any){
    let index = this.questions[i]?.dislike.indexOf(this.superUser._id);

    this.questions[i]?.dislike.splice(index , 1);

    this._data.dislikeQuestion(this.questions[i]?.dislike , this.questions[i]?._id).subscribe();
  }



  getLinkFromPostDescription(desc: String, ind : any){

    let httpPosition = desc.indexOf('http');
    let description : any = desc;
     let link = '';
     for(let i = 0; i < desc.length ; i++){
 
       if(httpPosition > -1 && i >= httpPosition && desc[i] !== ' ' ){
         link = link + desc[i];
        
        
       }
 
     }
 
     var dess = description.replace(link , '');
 
    let object = {
      link: link,
      txt : dess
    }
     
     
    return object;
     
 
   }


  testComment = false;

  ajoutComment(id: string, ind: any){

    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('text', this.comment.text);
    file.set('idQuestion', id);
    file.set('authorId', this.superUser._id);
    file.set('authorImage', this.superUser.image);
    file.set('authorName', this.superUser.name);




if(this.comment.text.length === 0 && this.fileInput.nativeElement.files.length === 0){
  this.testComment = true;
}else{
 
    this._data.addReponse(file).subscribe(


    

      res=>{
        this.url = '';
        console.log(ind);
        
        this.questions[ind]?.responses.push(res);
        this.comment = {

          postId: '',
          authorId: '',
          commentId: '' ,
          image: '',
          text: '',
          like: 0
      
      
        }
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      }
    ); 
}




  }

  getCommentByPostId(id: any){

    this._data.getCommentByPostId(id).subscribe(
      res=>{
        this.comments = res;
        this.showComment = true;
        console.log(res);
        
      }

    );

  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
    
      event.target.complete();
    }, 1000);
  }


 

  demoPost: any;
 

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      this.s = this.s + 10;
      this._data.getMyPost(this.user.idFacebook, this.s).subscribe(
        res=>{
          console.log(res);
          
         this.demoPost = res;
         for (var i of this.demoPost) {
          this.posts.push(i);
        }
       
        }
      );

    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


  getPosts(){
    this._data.getMyPost(this.user.idFacebook , 0).subscribe(
      res=>{
        this.posts = res;
     
        
      }
    );

  }


  groupe: any;


  post = {

    authorId: '',
    groupeId: '',
    image: '',
    text: '',
    like: 0,
    categorie: ''


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

async presentAlertConfirm(id: any) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
  
    message: 'هل أنت متأكد من حذف المنشور',
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
          this._data.deleteResponse(id).subscribe(
            res=>{
              this.ngOnInit();
            }
          );
        }
      }
    ]
  });

  await alert.present();
}

async presentAlertConfirmToDeleteComment(id: any) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
  
    message: 'هل أنت متأكد من حذف التعليق',
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
          this._data.deleteResponse(id).subscribe(
            res=>{
              this.ngOnInit();
              console.log(res);
              
            },
            err=>{
              console.log(err);
              
            }
          );
        }
      }
    ]
  });

  await alert.present();
}


async presentAlertPrompt(id: any, idp: any) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'تغيير التعليق',
    inputs: [

     
      {
        name: 'paragraph',
        id: 'paragraph',
        type: 'textarea',
        placeholder: 'التعليق'
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
         let comment = {
           comment : data.paragraph
         }
         this._data.updateTextResponse(id, comment).subscribe(
           res=>{
            this.ngOnInit();
           }
         );
        }
      }
    ]
  });

  await alert.present();
}




testPost = false;
  ajoutPost(){

    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('text', this.post.text);
    file.set('like', this.post.like.toString());
    file.set('authorId', this.user.idFacebook);
    file.set('groupeId', this.id);
    file.set('categorie', '');

    if(this.post.text.length === 0 && this.fileInput.nativeElement.files.length === 0){
      this.testPost = true;
    }else{
  this._data.addNewPost(file).subscribe(
      res=>{
        this.url = '';
        this.getPosts();
        this.post = {

          authorId: '',
          groupeId: '',
          image: '',
          text: '',
          like: 0,
          categorie: ''

      
      
        },
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      }
    );
    }


   


  }


}
