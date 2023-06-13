import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SwapidevService {

  constructor(private http: HttpClient) { }
  getPersonData() {
    return this.http.get<any>('https://swapi.dev/api/people/');
  }

  getPlanetData() {
    return this.http.get<any>('https://swapi.dev/api/planets');
  }
}
