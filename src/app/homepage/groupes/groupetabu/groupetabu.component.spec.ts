import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupetabuComponent } from './groupetabu.component';

describe('GroupetabuComponent', () => {
  let component: GroupetabuComponent;
  let fixture: ComponentFixture<GroupetabuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupetabuComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupetabuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
