import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupenewpostComponent } from './groupenewpost.component';

describe('GroupenewpostComponent', () => {
  let component: GroupenewpostComponent;
  let fixture: ComponentFixture<GroupenewpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupenewpostComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupenewpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
