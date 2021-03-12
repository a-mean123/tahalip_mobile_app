import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupetabComponent } from './groupetab.component';

describe('GroupetabComponent', () => {
  let component: GroupetabComponent;
  let fixture: ComponentFixture<GroupetabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupetabComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
