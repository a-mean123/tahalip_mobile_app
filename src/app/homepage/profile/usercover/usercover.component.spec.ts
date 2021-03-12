import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsercoverComponent } from './usercover.component';

describe('UsercoverComponent', () => {
  let component: UsercoverComponent;
  let fixture: ComponentFixture<UsercoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsercoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
