import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) { }


  searchUsers(query: string): Observable<any> {
    const url = `${this.apiUrl}search/users?q=${query}`;
    return this.http.get(url);
  }

  getUser(username: string): Promise<any> {
    const url = `${this.apiUrl}users/${username}`;
    return this.http.get(url).toPromise();
  }

  getUserFollowers(username: string):Observable<any>  {
    const url = `${this.apiUrl}users/${username}/followers`;
    return this.http.get(url);
  }
}

//https://api.github.com/users/
