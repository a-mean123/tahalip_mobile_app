import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MorevideoComponent } from './morevideo.component';

describe('MorevideoComponent', () => {
  let component: MorevideoComponent;
  let fixture: ComponentFixture<MorevideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorevideoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MorevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
