import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreategroupeComponent } from './creategroupe.component';

describe('CreategroupeComponent', () => {
  let component: CreategroupeComponent;
  let fixture: ComponentFixture<CreategroupeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategroupeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreategroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
