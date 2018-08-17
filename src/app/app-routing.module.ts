import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../app/search/search.component'
import { IndexComponent } from '../app/index/index.component'

const routes: Routes = [

  { path: 'search', component: SearchComponent },
  { path: 'index', component: IndexComponent },
  { path: '', component: IndexComponent }
 // { path: '', redirectTo: 'app-index', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
