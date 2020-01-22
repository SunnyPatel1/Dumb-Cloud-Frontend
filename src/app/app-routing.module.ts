import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SoftwareComponent } from './software/software.component';


const routes: Routes = [
  {path: '', component: UsersComponent },
  {path: 'software', component: SoftwareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
