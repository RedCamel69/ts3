import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SearchService } from '../search.service';
import { Search } from '../search';
import { SearchResponse, webPages, queryContext,value } from '../search-response'
import { LinkHttpPipe } from '../shared/link-http.pipe'
import { EncodeUrlPipe } from '../shared/encode-url.pipe'
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  search: Search;
  results: SearchResponse;
  results2: SearchResponse;

  searchComplete: boolean;

  count: number;
  offset: number;

  constructor(private searchService: SearchService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {

    this.search = new Search();
    this.results = new SearchResponse();
    this.results.webPages = new webPages();
    this.results.webPages.value = new Array<value>();
    this.results.queryContext = new queryContext();



    this.searchForm = this.fb.group({
      search: [null, [Validators.required]]
    });

    this.route.params.subscribe(params => {
      //console.log(params);

      if (params['count']) {
        this.count = params['count'];
      }
      else {
        this.count = 5;
      }

      if (params['offset']) {
        this.offset = params['offset'];
      }
      else {
        this.offset = 0;
      }

      if (params['search']) {
        console.log(params['search'])
        console.log('count:' + params['count'])
        console.log(params['offset'])

        this.search.Phrase = params['search'];

        this.callSearchService(this.search.Phrase, this.count, this.offset);

        this.searchForm.get('search').patchValue(this.search.Phrase);



      }
    });


  }

  doSearch(count: number, offset: number) {

      console.log('ggg');

      this.search.Phrase = this.searchForm.get('search').value;

     // this.searchService.search(this.search.Phrase, 5, 0);

    this.callSearchService(this.search.Phrase, 5, 0);

    
  }

 

  callSearchService(phrase: string, count: number, offset: number) {

      this.searchComplete = false;

    var spinner = document.getElementById("spinner");
    spinner.className = "fa fa-spinner fa-5x fa-spin";

    this.searchService.search(phrase, count, offset).subscribe(
        data => { this.results = data as SearchResponse; console.log(data); this.doSomething() },
        err => console.error(err),
        () => {
            //var spinner = document.getElementById("spinner");
            //spinner.className = "fa fa-spinner fa-5x fa-spin d-none"; //
            //console.log('finished loading');
            //console.log(this.results);
            //console.log(this.results.queryContext.originalQuery);

            this.searchComplete = true;
        }
    );
  }

  doSomething() {

  }


}


