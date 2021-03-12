import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.scss'],
})
export class MembresComponent implements OnInit {

  constructor(private router : ActivatedRoute, public _data: DataService) { }

  id: any;
  membres:any;
  ngOnInit() {

    this.id = this.router.snapshot.paramMap.get('idg');

    this._data.getGroupeMembre(this.id).subscribe(
      res=>{
        this.membres = res;
        console.log('hhhhhhhhhhh',this.membres);
        
      },
      err=>{

      }
    );

  }

}
