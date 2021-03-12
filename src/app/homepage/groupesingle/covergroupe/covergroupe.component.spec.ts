import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CovergroupeComponent } from './covergroupe.component';

describe('CovergroupeComponent', () => {
  let component: CovergroupeComponent;
  let fixture: ComponentFixture<CovergroupeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovergroupeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CovergroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
