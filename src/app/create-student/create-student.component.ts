import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();
  constructor(private studentService : StudentService, private router : Router) {
  }


  ngOnInit(): void {
    this.student.sourceOfInterestOptions = {
      friends: 'Friends',
      relatives: 'Relatives',
      internet: 'Internet',
      television: 'Television',
      // Add more options as needed
    };
  }

  saveSurvey(){
    this.student.date = formatDate(this.student.date, 'yyyy-MM-dd', 'en-US');
    this.studentService.createStudentSurvey(this.student).subscribe( data=>{
      console.log(data);
      this.goToStudentList();
    },
    error=> console.log(error));
  }

  goToStudentList(){
      this.router.navigate(['/surveys']);
  }

  onSubmit(){
    console.log(this.student);
    const selectedLikedOptions = this.student.getSelectedLikedOptions();
    console.log('Selected liked options:', selectedLikedOptions);
    this.saveSurvey();
  }

}
