import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksComponent as BlocksComponent } from './blocks.component';

describe('BlocosComponent', () => {
  let component: BlocksComponent;
  let fixture: ComponentFixture<BlocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlocksComponent],
    });
    fixture = TestBed.createComponent(BlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
