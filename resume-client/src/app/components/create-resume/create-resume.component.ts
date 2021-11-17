import { Component, OnInit,ViewChild } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface UsersData {
  company: string;
  years: string;
  details: string;
  id: number;
}
const ELEMENT_DATA: UsersData[] = [];

@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {
  displayedColumns: string[] = ['Company','Years','Details','Actions'];
  dataSource = ELEMENT_DATA;
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
  addCnd: Boolean=false;

  primarySchool!: string;
  highSchool!: string;
  primarySchoolState!: string;
  highSchoolState!: string;
  selectedUniversity!: string;
  primarySchoolCountry!: string;
  highSchoolCountry!: string;
  universityCountry!: string;
  masterCountry!: string;
  masterUniversity!: string;
  doctorateCountry!: string;
  doctorateUniversity!: string;
  selectedEducation!: string;

  companyName!:string;

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(public dialog: MatDialog,private fb: FormBuilder, private resumeService: ResumeService, private http: HttpClient) {

    this.fillCountries();
  }

  openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '750px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj:any){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      company:row_obj.company,
      years:row_obj.years,
      details:row_obj.details
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.company = row_obj.company,
        value.years = row_obj.years,
        value.details = row_obj.details
      }
      return true;
    });
  }
  deleteRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  fillCountries() {
    this.resumeService.getCountries().subscribe((data) => {
      this.countries = data;
    })
  }

  addExperience()
  {}

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

    this.resumeForm.controls['education'].setValue('Primary School: ' + this.primarySchool + ' ,' + this.primarySchoolState + ',' + this.primarySchoolCountry +
      ' High School: ' + this.highSchool + ' ,' + this.highSchoolState + ',' + this.highSchoolCountry +
      ' University: ' + this.selectedUniversity + ' ,' + this.universityCountry +
      ' Master: ' + this.masterUniversity + ' ,' + this.masterCountry +
      ' Doctorate: ' + this.doctorateUniversity + ' ,' + this.doctorateCountry);

    if (!this.resumeForm.valid) {
      return false;
    } else {
      if (this.file) {
        this.resumeService.upload(this.file).subscribe(res => {
          console.log(res)
        }
        );
      }
      this.resumeService.create(this.resumeForm.value).subscribe(
        (res) => {
          console.log(res)
        }, (error) => {
          console.log(error);
        });
      return true;
    }

  }

  onChange(event: any) {
    console.log(event)
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

