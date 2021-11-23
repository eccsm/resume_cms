import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface experience {
  company: string;
  position: string;
  years: string;
  details: string;
  id: number;
}

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
const EXPERIENCE_DATA: experience[] = [];
const ABOUT_DATA: about[] = [];
const EDUCATION_DATA: education[] = [];

@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {
  displayedColumns: string[] = ['company','position', 'years', 'details', 'actions'];
  experienceDataSource = EXPERIENCE_DATA;
  aboutDataSource = ABOUT_DATA;
  educationDataSource = EDUCATION_DATA;
  resumeForm!: FormGroup;
  university: any = [];
  masterUniversities: any = [];
  doctorateUniversities: any = [];
  countries!: any[];
  psStates!: any[];
  hsStates!: any[];
  progress!: number;
  infoMessage: any;
  isUploading: boolean = false;
  file!: File;
  imageUrl: string | ArrayBuffer | null = "";
  fileName: string = "No file selected";
  addCnd: Boolean = false;

  masterProgram!: string;
  doctorateProgram!: string;
  universityDepartment!: string;
  highSchool!: string;
  highSchoolState!: string;
  highSchoolYears!: string;
  selectedUniversity!: string;
  primarySchoolCountry!: string;
  highSchoolCountry!: string;
  universityCountry!: string;
  universityYears!: string;
  masterCountry!: string;
  masterUniversity!: string;
  masterYears!: string;
  doctorateCountry!: string;
  doctorateUniversity!: string;
  doctorateYears!: string;
  selectedEducation!: string;
  name!: string;
  surname!: string;
  mail!: string;
  phone!: string;
  address!: string;
  summary!: string;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private resumeService: ResumeService, private http: HttpClient) {

    this.fillCountries();
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '750px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    var d = new Date();
    this.experienceDataSource.push({
      id: d.getTime(),
      company: row_obj.company,
      position: row_obj.position,
      years: row_obj.years,
      details: row_obj.details
    });
    this.table.renderRows();

  }
  updateRowData(row_obj: any) {
    this.experienceDataSource = this.experienceDataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
          value.company = row_obj.company,
          value.position = row_obj.position,
          value.years = row_obj.years,
          value.details = row_obj.details
      }
      return true;
    });
  }
  deleteRowData(row_obj: any) {
    this.experienceDataSource = this.experienceDataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }

  fillCountries() {
    this.resumeService.getCountries().subscribe((data) => {
      this.countries = data;
    })
  }

  fillMasterUniversity() {
    this.resumeService.getUniversities(this.masterCountry).subscribe((data) => {
      this.masterUniversities = data;
    })
  }

  fillDoctorateUniversity() {
    this.resumeService.getUniversities(this.doctorateCountry).subscribe((data) => {
      this.doctorateUniversities = data;
    })
  }

  fillUniversity() {
    this.resumeService.getUniversities(this.universityCountry).subscribe((data) => {
      this.university = data;
    })
  }

  fillPrimarySchoolState() {
    this.resumeService.getStates(this.primarySchoolCountry).subscribe(data => {
      this.psStates = data;
    }, err => {
      alert(err.error.name)
    })
  }

  fillHighSchoolState() {
    this.resumeService.getStates(this.highSchoolCountry).subscribe((data) => {
      this.hsStates = data;
    })
  }


  ngOnInit() {
    this.mainForm();
  }

  mainForm() {
    this.resumeForm = this.fb.group({
      about: [''],
      experience: [''],
      education: [''],
      interests: [''],
      awards: [''],
      skills: ['']
    })
  }

  submit() {

    this.aboutDataSource.push({
      name: this.name,
      surname: this.surname,
      mail: this.mail,
      phone: this.phone,
      address: this.address,
      summary: this.summary
    });

    this.educationDataSource.push({
      universityDepartment: this.universityDepartment,
      masterProgram: this.masterProgram,
      doctorateProgram: this.doctorateProgram,
      highSchool: this.highSchool,
      highSchoolState: this.highSchoolState,
      highSchoolCountry: this.highSchoolCountry,
      highSchoolYears: this.highSchoolYears,
      university: this.selectedUniversity,
      universityCountry: this.universityCountry,
      universityYears: this.universityYears,
      master: this.masterUniversity,
      masterCountry: this.masterCountry,
      masterYears: this.masterYears,
      doctorate: this.doctorateUniversity,
      doctorateCountry: this.doctorateCountry,
      doctorateYears: this.doctorateYears
    });

    this.resumeForm.controls['about'].setValue(this.aboutDataSource);

    this.resumeForm.controls['experience'].setValue(this.experienceDataSource);

    this.resumeForm.controls['education'].setValue(this.educationDataSource);

    if (!this.resumeForm.valid) {
      return false;
    } else {
      this.resumeService.create(this.resumeForm.value).subscribe(
        (res) => { console.log(res) }, (error) => {
          alert(error);
        });
      this.aboutDataSource = [];
      this.experienceDataSource = [];
      this.educationDataSource = [];
      return true;
    }

  }

  onChange(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      this.fileName = this.file.name;
      this.file = this.file;

      const reader = new FileReader();
      reader.readAsDataURL(this.file);

      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }
}

