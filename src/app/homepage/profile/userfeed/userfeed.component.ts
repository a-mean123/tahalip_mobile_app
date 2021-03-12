import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { PhotoPopupComponent } from '../../photo-popup/photo-popup.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-userfeed',
  templateUrl: './userfeed.component.html',
  styleUrls: ['./userfeed.component.scss'],
})
export class UserfeedComponent implements OnInit {

  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public _data: DataService , private router : ActivatedRoute,  public alertController: AlertController,  public modalController: ModalController) { }
  
  heightOfCadre = 60;

  htmlContent='';
  countHeight(){
   
   if(( this.htmlContent.length % 33 === 0)){
   this.heightOfCadre = this.heightOfCadre + 30;
   console.log(this.heightOfCadre);
   }
     for(let i = 0; i< this.htmlContent.length - 2 ; i++){

       if(this.htmlContent[i] + this.htmlContent[i+1] === 'br'){
          this.heightOfCadre = this.heightOfCadre + 30;
          console.log(this.heightOfCadre);
       }
     }


     
  }

  editorConfig: AngularEditorConfig = {
   editable: true,
     spellcheck: true,
   
     maxHeight: '3',
     width: 'auto',
     minWidth: '0',
     translate: 'yes',
     enableToolbar: false,
     showToolbar: false,
     outline: false,
     defaultParagraphSeparator: '',
     defaultFontName: '',
     defaultFontSize: '',
     fonts: [
       {class: 'arial', name: 'Arial'},
       {class: 'times-new-roman', name: 'Times New Roman'},
       {class: 'calibri', name: 'Calibri'},
       {class: 'comic-sans-ms', name: 'Comic Sans MS'}
     ],
     customClasses: [
     {
       name: 'quote',
       class: 'quote',
     },
     {
       name: 'redText',
       class: 'redText'
     },
     {
       name: 'titleText',
       class: 'titleText',
       tag: 'h1',
     },
   ],
   uploadUrl: 'v1/image',
   uploadWithCredentials: false,
   sanitize: false,
   toolbarPosition: 'top',
   toolbarHiddenButtons: [
     ['bold', 'italic'],
     ['fontSize']
   ]
};

  
  s = 0;
  categorie: any;
  posts: any;
  id: any;
  user: any;
  selectedPost = -1;
  comments: any;
  showComment = false;
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




  like(i: any){
    this.removedislike(i);
    this.posts[i].like.push(this.user._id);

    let likes = this.posts[i].like;

    this._data.likePost(likes , this.posts[i]._id).subscribe();
    

  }

  dislike(i: any){
    let index = this.posts[i].like.indexOf(this.superUser._id);

    this.posts[i].like.splice(index , 1);

    this._data.likePost(this.posts[i].like , this.posts[i]._id).subscribe();
  }





  adddislike(i: any){
    this.dislike(i);
    this.posts[i].dislike.push(this.user._id);

    let likes = this.posts[i].dislike;

    this._data.dislikePost(likes , this.posts[i]._id).subscribe();
    

  }

  removedislike(i: any){
    let index = this.posts[i].dislike.indexOf(this.user._id);

    this.posts[i].dislike.splice(index , 1);

    this._data.dislikePost(this.posts[i].dislike , this.posts[i]._id).subscribe();
  }




  likecm(i: any){
    this.removedislikecm(i);
    this.comments[i].like.push(this.user._id);

    let likes = this.comments[i].like;

    this._data.likeComment(likes , this.comments[i]._id).subscribe();
    

  }

  dislikecm(i: any){
    let index = this.comments[i].like.indexOf(this.user._id);

    this.comments[i].like.splice(index , 1);

    this._data.likeComment(this.comments[i].like , this.comments[i]._id).subscribe();
  }


  adddislikecm(i: any){
    this.dislikecm(i);
    this.comments[i].dislike.push(this.user._id);

    let likes = this.comments[i].dislike;

    this._data.dislikeComment(likes , this.comments[i]._id).subscribe();
    

  }

  removedislikecm(i: any){
    let index = this.comments[i].dislike.indexOf(this.user._id);

    this.comments[i].dislike.splice(index , 1);

    this._data.dislikeComment(this.comments[i].dislike , this.comments[i]._id).subscribe();
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

  ajoutComment(id: string){

    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('text', this.comment.text);
    file.set('like', this.comment.like.toString());
    file.set('authorId', this.superUser.idFacebook);
    file.set('postId', id);
    file.set('commentId', this.comment.commentId);

if(this.comment.text.length === 0 && this.fileInput.nativeElement.files.length === 0){
  this.testComment = true;
}else{
 
    this._data.addComment(file).subscribe(


    

      res=>{
        this.getCommentByPostId(id);
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


 
  superUser: any;
  ngOnInit() {
    this.superUser = this._data.getUserData();
    this.id = this.router.snapshot.paramMap.get('id');
    this._data.getUserDataWithId(this.id)
    .subscribe(
      res=>{
        this.user = res;
        this._data.getMyPost(this.user.idFacebook, 0).subscribe(
          res=>{
            this.posts = res;
            
            
          }
        );
      }
    );
  

    

    this._data.getAllCategorie().subscribe(
      res=>{
        this.categorie = res;
      },
      err=>{
        console.log(err);
        
      }
    );




    this._data.getGroupeById(this.id).subscribe(
      res=>{
        this.groupe = res;
      },
      err=>{
        console.log(err);
        
      }
    );


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
          this._data.deletepost(id).subscribe(
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

async presentAlertConfirmToDeleteComment(id: any, idP: any) {
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
          this._data.deleteComment(id).subscribe(
            res=>{
              this.getCommentByPostId(idP);
            },
            err=>{
            
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
         this._data.updateTextComment(id, comment).subscribe(
           res=>{
             this.getCommentByPostId(idp);
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
