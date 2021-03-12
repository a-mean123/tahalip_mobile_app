import { Component, OnInit , ElementRef, ViewChild, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-groupenewpost',
  templateUrl: './groupenewpost.component.html',
  styleUrls: ['./groupenewpost.component.scss'],
})
export class GroupenewpostComponent implements OnInit {

  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  id: any;
  constructor(private _data : DataService, private router: ActivatedRoute) { }

 

  groupe: any;


  post = {

    authorId: '',
    groupeId: '',
    image: '',
    text: '',
    like: 0,
    categorie: ''


  }


  user: any;

  ngOnInit() {

    this.user = this._data.getUserData();
    console.log(this.user);
    console.log();

    this.id = this.router.snapshot.paramMap.get('id');

    this._data.getGroupeById(this.id).subscribe(
      res=>{
        this.groupe = res;
      },
      err=>{
        console.log(err);
        
      }
    );
    
  }


  ajoutPost(){

    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('text', this.post.text);
    file.set('like', this.post.like.toString());
    file.set('authorId', this.user.idFacebook);
    file.set('groupeId', this.id);
    file.set('categorie', this.groupe.categorie);




    this._data.addNewPost(file).subscribe(
      res=>{
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
