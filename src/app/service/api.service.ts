import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  readonly moreParams = ['test', 'test2'];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    let myHeaders = new HttpHeaders({'myToken': ['1234567890']});
    myHeaders = myHeaders.append('id', '000000');
    
    const someParams = { ['name']: this.moreParams };
    let myParams = new HttpParams({ fromObject: someParams });
    myParams = myParams.append('id', '000000');
    return this.http.get(`${this.apiUrl}/users`, { headers: myHeaders, params: myParams });
  }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`);
  }
}
