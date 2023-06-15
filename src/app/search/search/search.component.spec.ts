import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { SearchService } from '../../services/search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SearchComponent],
      providers: [
        {
          provide: SearchService,
          useValue: {
            searchUsers: jasmine.createSpy().and.returnValue(of([])),
            getUserFollowers: jasmine.createSpy().and.returnValue(of([])),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchUsers on search', () => {
    spyOn(component, 'updateUser');
    component.username = 'testuser';

    component.search();

    expect(searchService.searchUsers).toHaveBeenCalledWith('testuser');
    expect(component.updateUser).toHaveBeenCalled();
  });

  it('should call getUserFollowers and renderChart on updateFollowers', () => {
    component.users = [
      { login: 'user1', followers: 0 },
      { login: 'user2', followers: 0 },
    ];

    spyOn(component, 'renderChart');

    component.updateFollowers(component.users[0], []);

    expect(searchService.getUserFollowers).toHaveBeenCalledWith('user1');
    expect(component.renderChart).toHaveBeenCalled();
  });

  it('should render chart on updateFollowers', () => {
    component.users = [
      { login: 'user1', followers: 10 },
      { login: 'user2', followers: 20 },
    ];

    spyOn(component, 'renderChart');

    component.updateFollowers(component.users[0], [1, 2, 3]);

    expect(component.renderChart).toHaveBeenCalled();
  });

  it('should navigate to profile', () => {
    spyOn(component.router, 'navigate');

    component.navigateToProfile('testuser');

    expect(component.router.navigate).toHaveBeenCalledWith(['/profile', 'testuser']);
  });
});
