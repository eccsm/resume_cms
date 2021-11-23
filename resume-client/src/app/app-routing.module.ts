import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeViewComponent } from './components/resume-view/resume-view.component';
import { CreateResumeComponent } from './components/create-resume/create-resume.component';

const routes: Routes = [
  {path: 'resume', component: ResumeViewComponent},
  {path: 'create', component: CreateResumeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
