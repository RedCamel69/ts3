import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';

import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service

import { AppComponent } from './app.component';
import { IndexComponent } from './app/index/index.component';
import { SearchComponent } from './app/search/search.component';
import { EncodeUrlPipe } from './app/shared/encode-url.pipe';
import { LinkHttpPipe } from './app/shared/link-http.pipe';

import { SearchService } from './app/search.service';
import { AutocompleteService } from './app/autocomplete.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SearchComponent,
    EncodeUrlPipe,
    LinkHttpPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SearchService, AutocompleteService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
