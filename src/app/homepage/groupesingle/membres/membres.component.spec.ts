import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MembresComponent } from './membres.component';

describe('MembresComponent', () => {
  let component: MembresComponent;
  let fixture: ComponentFixture<MembresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
