import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../app/search/search.component';
import { IndexComponent } from '../app/index/index.component';
import { AboutComponent } from '../app/about/about.component';
import { DirectoryComponent  } from '../app/directory/directory.component';


const routes: Routes = [

  { path: 'search', component: SearchComponent },
  { path: 'index', component: IndexComponent },
  { path: 'about', component: AboutComponent },
  { path: 'visit', component: DirectoryComponent },


  { path: '', component: IndexComponent }
 // { path: '', redirectTo: 'app-index', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
