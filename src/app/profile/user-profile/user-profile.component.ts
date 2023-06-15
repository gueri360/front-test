import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../../services/search.service";
import {UserModel} from "../../models/user.model";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // @ViewChild('followersChartCanvas') followersChartCanvas!: ElementRef;

  username: string = '';
  user: UserModel;

  constructor(public route: ActivatedRoute,
              private userService: SearchService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.userService.getUser(this.username).then((response) => {
        this.user = response;
      });
    });
  }




}
