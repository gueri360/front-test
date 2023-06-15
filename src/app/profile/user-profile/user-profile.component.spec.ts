import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';
import { SearchService } from '../../services/search.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let searchService: SearchService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ username: 'testuser' }),
          },
        },
        {
          provide: SearchService,
          useValue: {
            getUser: jasmine.createSpy().and.returnValue(Promise.resolve({})),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should fetch user data on ngOnInit', async () => {
    fixture.detectChanges();

    await fixture.whenStable(); // Esperar a que las promesas se resuelvan

    expect(searchService.getUser).toHaveBeenCalledWith('testuser');
    expect(component.user).toBeDefined();
  });
});
