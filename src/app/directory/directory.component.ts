import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

    searchForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.fb.group({
            search: [null, [Validators.required]]
        });
  }

}
