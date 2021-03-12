import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-groupetab',
  templateUrl: './groupetab.component.html',
  styleUrls: ['./groupetab.component.scss'],
})
export class GroupetabComponent implements OnInit {

  @Input() id: String;

  constructor() { }

  ngOnInit() {}

}
