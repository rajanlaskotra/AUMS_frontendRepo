import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AddcourseComponent } from './components/addcourse/addcourse.component';
import { UpdatecourseComponent } from './components/updatecourse/updatecourse.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { AddtrainerComponent } from './components/addtrainer/addtrainer.component';
import { MaterialComponent } from './components/material/material.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent},
  { path: 'addcourse', component: AddcourseComponent},
  { path: 'updatecourse', component: UpdatecourseComponent},
  { path: 'trainers', component: TrainersComponent},
  { path: 'addtrainer', component: AddtrainerComponent},
  { path: 'material', component: MaterialComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
