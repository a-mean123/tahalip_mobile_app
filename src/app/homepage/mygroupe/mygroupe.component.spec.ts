import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MygroupeComponent } from './mygroupe.component';

describe('MygroupeComponent', () => {
  let component: MygroupeComponent;
  let fixture: ComponentFixture<MygroupeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MygroupeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MygroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
