import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';  // replaces previous Http service

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';
import { EncodeUrlPipe } from './shared/encode-url.pipe';
import { LinkHttpPipe } from './shared/link-http.pipe';

import { SearchService } from './search.service';
import { AutocompleteService } from './autocomplete.service';
import { AboutComponent } from './about/about.component';
import { DirectoryComponent } from './directory/directory.component';

@NgModule({
  declarations: [
   AppComponent,
    IndexComponent,
    SearchComponent,
    EncodeUrlPipe,
    LinkHttpPipe,
    AboutComponent,
    DirectoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
      HttpClientModule,
      HttpClientJsonpModule
  ],
  providers: [SearchService, AutocompleteService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
