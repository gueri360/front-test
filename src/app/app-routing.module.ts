import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./search/search/search.component";
import {UserProfileComponent} from "./profile/user-profile/user-profile.component";

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'profile/:username', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
