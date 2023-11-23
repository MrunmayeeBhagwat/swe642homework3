// Group Project Assignment 3
// G01388668 Mrunmayee Bhagwat
// G01411756 Priyesh Patil
// G01368980 Srinath Silla
// G01413450 Bhavya Sree Pannem 
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import {ChangeDetectorRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UpdateStudentComponent implements OnInit {

  id!: number;
  student: Student = new Student();
  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Update Student Component Initialized');
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudentById(this.id).subscribe((data) => {
      this.student = data;
      this.student.sourceOfInterestOptions = {
        friends: 'Friends',
        relatives: 'Relatives',
        internet: 'Internet',
        television: 'Television',
      };
      console.log('Student Data:', this.student);
      console.log('Source of Interest:', this.student.sourceOfInterest);
      console.log('After detectChanges');
    });
    this.cdr.detectChanges();
  }

  goToStudentList() {
    this.router.navigate(['/surveys']);
  }

  updateStudent() {
    this.studentService.updateStudent(this.id, this.student).subscribe(
      {
        next: (data: any) => {
        console.log('Updated student data:', data);
        this.student = data;
        this.displaySubmissionAcknowledgement(this.student.firstName,this.student.lastName);
        this.goToStudentList();
      },
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  onSelectedOptionChange(value: string): void {
    console.log('Selected option changed:', value);
  }
  toggleCheckbox(optionKey: string): void {
    this.student.likedOptions[optionKey] =
      !this.student.likedOptions[optionKey];
  }

  updateSourceOfInterest(optionKey: string): void {
    console.log('Option Key:', optionKey);
    this.student.sourceOfInterest = optionKey;
  }

  onSubmit() {
    this.updateStudent();
  }

  public displaySubmissionAcknowledgement(firstName: String, lastName: String) {
    const body = document.getElementById('ack-modal');
    body!.innerHTML = `Data updated successfully for ${firstName} ${lastName}`;
    const modalElement = document.getElementById('updateAcknowledgementModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }
}


