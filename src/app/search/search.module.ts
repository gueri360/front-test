import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {SearchService} from "../services/search.service";
import { SearchComponent } from './search/search.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ErrorModule} from "../error/error.module";
import {ErrorComponent} from "../error/error/error.component";



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ErrorModule,
  ],
  providers: [
    SearchService,
  ErrorComponent]
})
export class SearchModule { }
