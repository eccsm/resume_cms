import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';


@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeViewComponent implements OnInit {

  imageToShow: any;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.getImageFromService();
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
      console.log(error);
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
