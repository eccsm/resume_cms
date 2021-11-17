import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from 'src/app/models/resume.model';

@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.css']
})
export class ResumeDetailsComponent implements OnInit {

  currentResume: Resume = {
    about: '',
    experience: '',
    education: '',
    skills: '',
    interests: '',
    awards: ''
  };
  message = '';

  constructor(
    private ResumeService: ResumeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getResume(this.route.snapshot.params.id);
  }

  getResume(id: string): void {
    this.ResumeService.get()
      .subscribe(
        data => {
          this.currentResume = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      about: this.currentResume.about,
      experience: this.currentResume.experience,
      education: this.currentResume.education,
      skills: this.currentResume.skills,
      interests: this.currentResume.interests,
      awards: this.currentResume.awards
    };

    this.message = '';

    this.ResumeService.update(this.currentResume.about, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateResume(): void {
    this.message = '';

    this.ResumeService.update(this.currentResume.about, this.currentResume)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This Resume was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteResume(): void {
    this.ResumeService.delete(this.currentResume.about)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/Resumes']);
        },
        error => {
          console.log(error);
        });
  }

}
