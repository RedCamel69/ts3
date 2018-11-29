import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SearchService } from '../search.service';
import { AutocompleteService } from '../autocomplete.service';
import { Search } from '../search';
import { WikipediaSearchResponse,SearchResponse, webPages, queryContext,value } from '../search-response'
import { LinkHttpPipe } from '../shared/link-http.pipe'
import { EncodeUrlPipe } from '../shared/encode-url.pipe'
import { ActivatedRoute } from "@angular/router";
import { Suggestions, suggestionGroups, suggestionGroup, searchSuggestions, searchSuggestion } from '../autocomplete-response'

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


  wikiResults: WikipediaSearchResponse;
  wikiExtract: string;
  weHaveWikiExtract: boolean;
  displayWikiExtract: boolean;  


  searchComplete: boolean;
  autocompleteResponse: Suggestions;

  count: number;
  offset: number;
  currentPage: number;  

  values = '';
  hideSuggestions: boolean;
  hideResults: boolean;

  constructor(private searchService: SearchService,
      private autocompleteService: AutocompleteService,
      private fb: FormBuilder,
      private route: ActivatedRoute) { }

  ngOnInit() {

    this.search = new Search();
    this.results = new SearchResponse();
    this.results.webPages = new webPages();
    this.results.webPages.value = new Array<value>();
    this.results.queryContext = new queryContext();

    this.hideSuggestions = true;
    this.hideResults = false;

    this.weHaveWikiExtract = false;

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


    this.currentPage = 1;
  }

  doSearch(count: number, offset: number) {

      this.hideResults = true;
      this.currentPage = offset / count;
      console.log('ggg');

      this.search.Phrase = this.searchForm.get('search').value;

     // this.searchService.search(this.search.Phrase, 5, 0);

      this.callSearchService(this.search.Phrase, count, offset);

      this.count = count;
      this.offset = offset;

    
  }

  previousPage() {
      if (this.currentPage > 1) {
          this.currentPage = this.currentPage - 1;
      }
      this.doSearch(10, this.currentPage * 10);
  }


  nextPage() {
      this.currentPage = this.currentPage + 1;
      this.doSearch(10, this.currentPage * 10);
  }
 

  callSearchService(phrase: string, count: number, offset: number) {

      this.searchComplete = false;
      this.hideSuggestions = true;

    var spinner = document.getElementById("spinner");
    spinner.className = "fa fa-spinner fa-5x fa-spin";

    this.callWikiPedia(phrase, false);

    this.searchService.search(phrase, count, offset).subscribe(
        data => { this.results = data as SearchResponse; console.log(data); this.doSomething() },
        err => console.error(err),
        () => {
            this.searchComplete = true;
        }
    );
  }


  callWikiPedia(phrase: string, displayResults: boolean) {

     
      this.weHaveWikiExtract = false;


      this.searchService.wikipediaSearch(phrase).subscribe(
          data => {
              console.log(data);

              this.wikiResults = data as WikipediaSearchResponse;

              console.log(this.wikiResults);

              console.log(this.wikiResults.query.pages[Object.keys(this.wikiResults.query.pages)[0]].extract;

              if (this.wikiResults.query.pages[Object.keys(this.wikiResults.query.pages)[0]].extract !== undefined) {

                  this.weHaveWikiExtract = true;
                  this.wikiExtract = this.wikiResults.query.pages[Object.keys(this.wikiResults.query.pages)[0]].extract;
              }

              console.log("this.weHaveWikiExtract" + this.weHaveWikiExtract);

              // console.log(this.wikiResults.query.pages[0].extract);

              //if (data.query.pages[Object.keys(data.query.pages)[0]].extract !== undefined) {

              //    console.log(data.query.pages[Object.keys(data.query.pages)[0]].extract);
              //}

          },
          err => console.error(err),
          () => {
              //this.searchComplete = true;

              this.displayWikiExtract = displayResults && this.weHaveWikiExtract;
          }
      );
  }  

  flipWiki() {
      this.hideResults = !this.hideResults;
      this.displayWikiExtract = !this.displayWikiExtract;
  }

  doSomething() {
      this.hideResults = false;
  }


  autocomplete(term) {

      //this.searchService.search(phrase, count, offset).subscribe(
      //  data => { this.results = data as SearchResponse; console.log(data); this.doSomething() },
      //  err => console.error(err),
      //  () => {
      //    var spinner = document.getElementById("spinner");
      //    spinner.className = "fa fa-spinner fa-5x fa-spin d-none"; //
      //    console.log('finished loading');
      //    console.log(this.results);
      //    console.log(this.results.queryContext.originalQuery);
      //  }
      //);

      this.autocompleteService.autocomplete(term).subscribe(
          data => {
              this.autocompleteResponse = data as Suggestions;

              this.hideSuggestions = false;


          }
      )
  }


  onKey(event: any) {

      // without type info
      //this.values += event.target.value + ' | ';
      this.values = event.target.value;
      console.log(this.values);

      if (this.values.length > 2) {
          this.autocomplete(this.values);
          this.hideSuggestions = false;
      }
  }

  useSuggestion(suggestion) {

      this.searchForm.patchValue({ search: suggestion.displayText });

      this.hideSuggestions = true;


  }
}


