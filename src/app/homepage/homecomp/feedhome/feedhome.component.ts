import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PhotoPopupComponent } from '../../photo-popup/photo-popup.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { YoutubeService } from 'src/app/services/youtube.service';


@Component({
  selector: 'app-feedhome',
  templateUrl: './feedhome.component.html',
  styleUrls: ['./feedhome.component.scss'],
})
export class FeedhomeComponent implements OnInit {
   @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
   @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(

    public _data: DataService , 
    public alertController: AlertController, 
    private youTubeService: YoutubeService,
    public modalController: ModalController) {

    
     }

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

item:any;
 
  testComment = false;
  s = 0;
  post = {

    authorId: '',
    groupeId: '',
    image: '',
    text: '',
    like: 0,
    categorie: ''


  };
  categorie: any;
  posts: any;
  user: any;
  selectedPost = -1;
  comments: any;
  showComment = false;
  questions: any;
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

  indexSliderQuestion : Number;
  indexSliderGroupe : Number;

  indexSliderEpisode : Number;


  groupes: any;

  videos: any;
  videosall: any;

  result: any;
  ngOnInit() {

  
    this.indexSliderEpisode = Math.floor((Math.random() * 3) + 2);
    this.indexSliderQuestion = Math.floor((Math.random() * 6) + 5);
    this.indexSliderGroupe = Math.floor((Math.random() * 6) + 8);


    this.youTubeService
    .getVideosForChanel('UCuLxvZzGeoJYATCMr97dJZQ', 7)
   
    .subscribe(res => {
        this.result = res;
        this.videos = this.result.items;
        console.log(this.videos);
        
      
    });

    this.youTubeService
    .getVideosForChanel('UCuLxvZzGeoJYATCMr97dJZQ', 25)
   
    .subscribe(res => {
        this.result = res;
        this.videosall = this.result.items;
        console.log(this.videos);
        
      
    });




  this._data.getlatestGroupe().subscribe(
      res=>{
        this.groupes = res;
      }
    );

    this._data.getAllQuestion().subscribe(
      res=>{
        this.questions = res;
      }
    );

    console.log(this.indexSliderQuestion);
    this._data.getAllCategorie().subscribe(
      res=>{
        this.categorie = res;
      },
      err=>{
        console.log(err);
        
      }
    );

    this.user = this._data.getUserData();

      this.refresh(0);
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









  like(i: any){
    this.removedislike(i);
    this.posts[i].like.push(this.user._id);

    let likes = this.posts[i].like;

    this._data.likePost(likes , this.posts[i]._id).subscribe();
    

  }

  dislike(i: any){
    let index = this.posts[i].like.indexOf(this.user._id);

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






  filter(c: string){

    this._data.getPostByCategorie(c , 0).subscribe(
      res=>{
        this.posts = res;
      },
      err=>{
        console.log(err);
        
      }
    );
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.refresh(0);
      event.target.complete();
    }, 500);
  }

  refresh(sk: any){
  
    this._data.getlatestPost(sk).subscribe(
      res=>{
        this.posts = res;
       
        console.log(this.posts);
      
        
        
      }
    );
    
  }

  demoPost: any;
  cat = '';

  loadData(event) {
    this.demoPost = [];

    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    this.cat.length === 0  ? this.simpleLoad() : this.load();
     

    }, 1000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


simpleLoad(){
  this.s = this.s + 20;

  this._data.getlatestPost(this.s).subscribe(
    res=>{
      console.log(res);
      
     this.demoPost = res;
     for (var i of this.demoPost) {
      this.posts.push(i);
    }
   
    }
  )
}



load(){
  
  
  this.s = this.s + 20;  
  
  this.demoPost = [];
  this._data.getPostByCategorie(this.cat , this.s).subscribe(
    res=>{
      console.log('lllllllllllllllll' , res);
      this.demoPost = res;
      for (var i of this.demoPost) {
       this.posts.push(i);
     }
    },
    err=>{
      console.log(err);
      
    }
  );
}



  url : any;
  ext : any;
  onAdd(event: any) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.url = event.target.result;
          this.ext = this.url.split('.').pop();
        
          
      }
      reader.readAsDataURL(event.target.files[0]);
  }
}



testPost = false;

  ajoutPost(){

    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('text', this.post.text);
    file.set('like', this.post.like.toString());
    file.set('authorId', this.user.idFacebook);
    
    file.set('categorie', '');


    if(this.post.text.length === 0 && this.fileInput.nativeElement.files.length === 0){
      this.testPost = true;
    }else{
    this._data.addNewPost(file).subscribe(
      res=>{

        this.refresh(0);

        this.post = {

          authorId: '',
          groupeId: '',
          image: '',
          text: '',
          like: 0,
          categorie: '',
          

      
      
        }

        this.url = '';
       
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







  
  ajoutComment(id: string){

    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('text', this.comment.text);
    file.set('like', this.comment.like.toString());
    file.set('authorId', this.user.idFacebook);
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









}
