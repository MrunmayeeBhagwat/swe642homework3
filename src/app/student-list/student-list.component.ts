// Group Project Assignment 3
// G01388668 Mrunmayee Bhagwat
// G01411756 Priyesh Patil
// G01368980 Srinath Silla
// G01413450 Bhavya Sree Pannem 
import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students!: Student[];
  public delStudent = new Student();
  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents() {
    this.studentService.getStudentsList().subscribe((data) => {
      this.students = data;
    });
  }

  updateStudent(id: number) {
    this.router.navigate(['update-student', id]);
  }

  deleteStudent(id: number) {
    document.getElementById('delete-survey-form')?.click();
    this.studentService.deleteStudent(id).subscribe((data) => {
      console.log(data);
      this.getStudents();
    });
  }

  public displayDeleteAcknowledgement(student: Student) {
    this.delStudent = student;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#deleteStudentSurveyModal');
    container?.appendChild(button);
    button.click();
  }
}
