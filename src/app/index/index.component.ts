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
    this.autocompleteResponse.suggestionGroups[0].searchSuggestions[0].displayText = "The Woodland Trust";
    

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

  onKey(event: any) {


      var liSelected;
      var index = -1;
      var ul = document.getElementById('list');
      var numberOfSuggestions = document.getElementsByTagName("li").length;
      var currentSelection = -1;

      var definingSearch = false;
      var selectedSearch = "";

      if (event.srcElement.id === "search") {
          definingSearch = true;
      }

      if (document.getElementsByTagName("li").length > 0) {
          definingSearch = true;
      }


      //arrow down
      if (definingSearch && event.code === "ArrowDown") {


          while (index < numberOfSuggestions - 1) {

              index++;

              if (document.getElementsByTagName("li")[index].className === "suggestionListSelected") {
                  currentSelection = index;
                  selectedSearch = document.getElementsByTagName("li")[index].innerText
                  //document.getElementsByTagName("li")[index].className = "suggestionList"
              }
              //console.log(document.getElementsByClassName("suggestionList")[index]);
          }

          var i;
          for (i = 0; i < numberOfSuggestions; i++) {
              document.getElementsByTagName("li")[i].className = "suggestionList"
          }


          if (currentSelection === -1) {
              document.getElementsByTagName("li")[0].className = "suggestionListSelected"
              selectedSearch = document.getElementsByTagName("li")[0].innerText
          }
          else {
              if (currentSelection === numberOfSuggestions - 1) {
                  document.getElementsByTagName("li")[0].className = "suggestionListSelected";
                  selectedSearch = document.getElementsByTagName("li")[0].innerText
              }
              else {
                  document.getElementsByTagName("li")[currentSelection + 1].className = "suggestionListSelected";
                  selectedSearch = document.getElementsByTagName("li")[currentSelection + 1].innerText
              }
              
          }

          if (selectedSearch !== "") {
              this.indexForm.patchValue({ search: selectedSearch }); 
          }



          //while (index < numberOfSuggestions) {

          //    index++;

          //    if (document.getElementsByTagName("li")[index].className === "suggestionList") {
          //        alert('here');
          //    }
          //    //console.log(document.getElementsByClassName("suggestionList")[index]);
          //}


          

          //var selectedSuggestion = document.getElementsByClassName("suggestionListSelected")[index];

          //if (firstSelectedSuggestion) {
          //    firstSelectedSuggestion.className = "suggestionList";
          //    document.getElementsByClassName("suggestionList")[index]
          //}


          

          //if (firstSuggestion != null) {
          //    console.log("highlight it");
          //}

          //console.log("arrow down");
          return;
      }


      if (definingSearch && event.code === "ArrowUp") {
          console.log('up');

         


          index = document.getElementsByTagName("li").length;

          while (index > 0) {

              index--;

              if (document.getElementsByTagName("li")[index].className === "suggestionListSelected") {
                  currentSelection = index;
                  //selectedSearch = document.getElementsByTagName("li")[index].innerText
                  //document.getElementsByTagName("li")[index].className = "suggestionList"
              }
              //console.log(document.getElementsByClassName("suggestionList")[index]);
          }

          var i;
          for (i = 0; i < numberOfSuggestions; i++) {
              document.getElementsByTagName("li")[i].className = "suggestionList"
          }


          if (currentSelection === -1) {
              document.getElementsByTagName("li")[0].className = "suggestionListSelected"
              selectedSearch = document.getElementsByTagName("li")[0].innerText
          }
          else {
              if (currentSelection === 0) {
                  document.getElementsByTagName("li")[numberOfSuggestions-1].className = "suggestionListSelected";
                  selectedSearch = document.getElementsByTagName("li")[numberOfSuggestions-1].innerText
              }
              else {
                  document.getElementsByTagName("li")[currentSelection -1].className = "suggestionListSelected";
                  selectedSearch = document.getElementsByTagName("li")[currentSelection - 1].innerText
              }



          }

          if (selectedSearch !== "") {
              this.indexForm.patchValue({ search: selectedSearch });
          }
      }

      if (event.code === "Enter") {
          this.continue();
      }

      console.log(event);
      console.log(event.code);

    // without type info
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
          this.autocompleteResponse = data as Suggestions;

          console.log(this.autocompleteResponse);
          console.log("XXXXXXXXXXXXXX");
        console.log(this.autocompleteResponse.queryContext.originalQuery);
        console.log(this.autocompleteResponse.suggestionGroups[0]);
        console.log(this.autocompleteResponse.suggestionGroups[0].searchSuggestions);
        console.log(this.autocompleteResponse.suggestionGroups[0].searchSuggestions[1].displayText);


      }
    )
  }

  continue(): void {
    this.search.Phrase = this.indexForm.get('search').value;
   // this.searchService.search(this.search.Phrase, 5, 0);
    this.router.navigate(['./search', { 'search': this.search.Phrase, 'count': 5, 'offset': 0 }])
  }

  useSuggestion(suggestion) {

      this.indexForm.patchValue({ search: suggestion.displayText }); 

      
  }
}
