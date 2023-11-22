// Group Project Assignment 3
// G01388668 Mrunmayee Bhagwat
// G01411756 Priyesh Patil
// G01368980 Srinath Silla
// G01413450 Bhavya Sree Pannem 
import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Modal } from 'bootstrap';



@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  student: Student = new Student();
  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    // Initializing sourceOfInterestOptions for the radio button
    this.student.sourceOfInterestOptions = {
      friends: 'Friends',
      relatives: 'Relatives',
      internet: 'Internet',
      television: 'Television',
      // Add more options as needed
    };
  }

  // Subscribing the data on the survey page and displaying them in Student List Page
  saveSurvey() {
    this.student.date = formatDate(this.student.date, 'yyyy-MM-dd', 'en-US');
    this.studentService.createStudentSurvey(this.student).subscribe({
      next: (data: any) => {
        console.log(data);
        this.displaySubmissionAcknowledgement(
          this.student.firstName,
          this.student.lastName
        );
        this.goToStudentList();
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }
  // Creating routing for the Survey Page
  goToStudentList() {
    this.router.navigate(['/surveys']);
  }

  onSubmit() {
    console.log(this.student);
    const selectedLikedOptions = this.student.getSelectedLikedOptions();
    console.log('Selected liked options:', selectedLikedOptions);
    this.saveSurvey();
  }

  public displaySubmissionAcknowledgement(firstName: String, lastName: String) {
    const body = document.getElementById('ack-modal');
    body!.innerHTML = `Data added successfully for ${firstName} ${lastName}`;
    const modalElement = document.getElementById('showAcknowledgementModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }
}
