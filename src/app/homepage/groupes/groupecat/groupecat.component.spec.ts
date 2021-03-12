import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupecatComponent } from './groupecat.component';

describe('GroupecatComponent', () => {
  let component: GroupecatComponent;
  let fixture: ComponentFixture<GroupecatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupecatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupecatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
