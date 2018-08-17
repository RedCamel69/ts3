import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SearchService } from '../search.service';
import { Search } from '../search';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  indexForm: FormGroup;
  search: Search;


  constructor(private fb: FormBuilder, private router: Router, private searchService: SearchService) { }

  ngOnInit() {

    this.search = new Search();

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

  continue(): void {
    this.search.Phrase = this.indexForm.get('search').value;
    this.searchService.search(this.search.Phrase, 5, 0);
    this.router.navigate(['./search', { 'search': this.search.Phrase, 'count': 5, 'offset': 0 }])
  }
}
