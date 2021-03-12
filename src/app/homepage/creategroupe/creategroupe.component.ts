import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-creategroupe',
  templateUrl: './creategroupe.component.html',
  styleUrls: ['./creategroupe.component.scss'],
})
export class CreategroupeComponent implements OnInit {



  etape1 = true;
  etape2 = false;
  etape3 = false;

user: any;



  gotoetape2(){

    this.etape1 = false;
    this.etape2 = true;

  }




  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  constructor(private data : DataService, private route: Router, private _location: Location) { }

  groupe = {
    name: '',
    description:'',
    image:'',
    founder:'',
    categorie:'',
    status: false
   
  }
  test1 = false;
  test2 = false;
  test3 = false;
  test4 = false;



  categories:any;

  ngOnInit(): void {
    this.data.getAllcategorie().subscribe(
      res=>{
        this.categories = res;
      }
    );

    this.user = this.data.getUserData();
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


showSpinner = false;

  add(){
    this.showSpinner = true;
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('name', this.groupe.name);
    file.set('description', this.groupe.description);
    file.set('founder', this.user._id);
    file.set('categorie', this.groupe.categorie);
    file.set('status', this.groupe.status.toString());


    this.test1 = this.groupe.name.length < 2 ? true : false;
    this.test2 = this.groupe.description.length < 2 ? true : false;
    this.test3 = this.groupe.categorie.length < 2 ? true : false;

    this.test4 = this.url ? false : true;
  
    if(this.test1  === false && this.test2  === false && this.test3  === false && this.test4  === false ){
        let id: any;
    
    this.data.addGroupe(file).subscribe(
      res=>{
        this.showSpinner = false;
        this.groupe = {
          name: '',
          description:'',
          image:'',
          founder:'',
          categorie:'',
          status: false
         
        };
        id = res;
        this.route.navigate(['/home/groupedetail/' , id._id]);
      }, 
      err=>{
        console.log(err);
        
      }
    );
    }else{
      console.log('err');
      
    }


  }

  back(){
    this._location.back();
  }


}
