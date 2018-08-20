import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SearchService } from '../search.service';
import { AutocompleteService } from '../autocomplete.service';
import { Search } from '../search';
import { Router } from '@angular/router';
import { Suggestions, suggestionGroups, suggestionGroup, searchSuggestions, searchSuggestion } from '../autocomplete-response'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  indexForm: FormGroup;
  search: Search;
  values = '';

  autocompleteResponse: Suggestions;

  constructor(private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService,
    private autocompleteService: AutocompleteService
  ) { }

  ngOnInit() {

    this.search = new Search();
    this.autocompleteResponse = new Suggestions();
    this.autocompleteResponse.suggestionGroups = new suggestionGroups();
    this.autocompleteResponse.suggestionGroups[0] = new suggestionGroup();
    this.autocompleteResponse.suggestionGroups[0].searchSuggestions = new searchSuggestions();
    this.autocompleteResponse.suggestionGroups[0].searchSuggestions[0] = new searchSuggestion();
    this.autocompleteResponse.suggestionGroups[0].searchSuggestions[0].displayText = "grr";
    

    this.indexForm = this.fb.group({
      search: [null, [Validators.required]]
    });
  }


  toggleMenu(x) {
    console.log(x);
    var burgerContainer = document.getElementById('burger')
    console.log(burgerContainer);

    document.getElementsByClassName('bar1')[0].classList.toggle('change');
    document.getElementsByClassName('bar2')[0].classList.toggle('change');
    document.getElementsByClassName('bar3')[0].classList.toggle('change');

    document.getElementById('menu').classList.toggle('change');

  }

  onKey(event: any) { // without type info
    //this.values += event.target.value + ' | ';
    this.values = event.target.value;
    console.log(this.values);

    if (this.values.length > 2) {
      this.autocomplete(this.values);
    }

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
        console.log(this.autocompleteResponse = data as Suggestions);

        console.log(this.autocompleteResponse.queryContext.originalQuery);
        console.log(this.autocompleteResponse.suggestionGroups[0]);
        console.log(this.autocompleteResponse.suggestionGroups[0].searchSuggestions);
        console.log(this.autocompleteResponse.suggestionGroups[0].searchSuggestions[1].displayText);


      }
    )
  }

  continue(): void {
    this.search.Phrase = this.indexForm.get('search').value;
    this.searchService.search(this.search.Phrase, 5, 0);
    this.router.navigate(['./search', { 'search': this.search.Phrase, 'count': 5, 'offset': 0 }])
  }
}
