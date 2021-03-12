import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserfeedComponent } from './userfeed.component';

describe('UserfeedComponent', () => {
  let component: UserfeedComponent;
  let fixture: ComponentFixture<UserfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfeedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
