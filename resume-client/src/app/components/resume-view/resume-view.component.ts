import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Resume } from 'src/app/models/resume.model';
import { ResumeService } from 'src/app/services/resume.service';

export interface about {
  name: string;
  surname: string;
  mail: string;
  phone: string;
  address: string;
  summary: string;
}

export interface education {
  highSchool: string;
  highSchoolState: string;
  highSchoolCountry: string;
  highSchoolYears: string;
  university: string;
  universityCountry: string;
  universityYears: string;
  master: string;
  masterCountry: string;
  masterYears: string;
  doctorate: string;
  doctorateCountry: string;
  doctorateYears: string;
  masterProgram: string;
  doctorateProgram: string;
  universityDepartment: string;
}

export interface experience {
  company: string;
  position: string;
  years: string;
  details: string;
  id: number;
}

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeViewComponent implements OnInit {

  imageToShow: any;
  awards: any[] = [];
  education: any[] = [];
  experience: any[] = [];
  interests: any[] = [];
  skills: any[] = [];
  about: any[] = [];
  resume?: Resume;
  testarr?: any[];
  aboutInf!: about;
  experienceInf!: experience[];
  educationInf!: education;
  skillsData!: string;
  awardsData!: string;
  interestsData!: string;

  constructor(private resumeService: ResumeService) { }

  async ngOnInit(): Promise<void> {
    this.getImageFromService();
    this.resume = await this.resumeService.get().toPromise()
    this.education = Array.of(this.resume.education);
    this.about = Array.of(this.resume.about);
    this.awards = Array.of(this.resume.awards);
    this.experience = Array.of(this.resume.experience);
    this.interests = Array.of(this.resume.interests);
    this.skills = Array.of(this.resume.skills);

    const aboutIterator = this.about[0].values();
    const educationIterator = this.education[0].values();
    const experienceIterator = this.experience.values();

    for (let value of aboutIterator) {
      this.aboutInf = value;
    }

    for (let value of educationIterator) {
      this.educationInf = value;
    }

    for (let value of experienceIterator) {
      this.experienceInf = value;
    }

    this.interestsData = this.interests[0]
    this.awardsData = this.awards[0]
    this.skillsData = this.skills[0]
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    this.resumeService.donwload().subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      alert(error);
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
