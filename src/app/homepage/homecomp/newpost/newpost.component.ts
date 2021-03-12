import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FeedhomeComponent } from '../feedhome/feedhome.component';
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss'],
})
export class NewpostComponent implements OnInit {
  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  constructor(private _data : DataService ,private router: Router,
    
   private  homefeed: FeedhomeComponent                                         
    ) { }



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
    
  }


}
