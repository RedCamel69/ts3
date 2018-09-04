import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }


  search(searchPhrase: string, count: number, offset: number) {


    const headers = new HttpHeaders({ 'Boing': 'xyz', 'Ocp-Apim-Subscription-Key': '509b0bba9b624d8083f078826958b2a9' });


    console.log('Search Service:' + searchPhrase, count, offset);

    var res = this.http.get(
      'https://api.cognitive.microsoft.com/bing/v7.0/search?q=' + encodeURI(searchPhrase) + '&mkt=en-gb&count=' + count + '&offset=' + offset,
      { headers: headers }
    );

    //console.log('grrr' + res);
    return res;
  }

}
