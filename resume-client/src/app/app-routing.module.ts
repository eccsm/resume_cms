import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeViewComponent } from './components/resume-view/resume-view.component';
import { ResumeDetailsComponent } from './components/resume-details/resume-details.component';
import { CreateResumeComponent } from './components/create-resume/create-resume.component';

const routes: Routes = [
  {path: 'resume', component: ResumeViewComponent},
  {path: 'update', component: ResumeDetailsComponent},
  {path: 'create', component: CreateResumeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
