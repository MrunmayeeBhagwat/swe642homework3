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



@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UpdateStudentComponent implements OnInit {

  id!: number;
  student: Student = new Student();
  constructor(private studentService : StudentService, private router : Router, private route : ActivatedRoute, private cdr: ChangeDetectorRef) {
  }



  ngOnInit(): void {
    console.log('Update Student Component Initialized');
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudentById(this.id).subscribe(data => {
      this.student = data;
      this.student.sourceOfInterestOptions = {
        friends: 'Friends',
        relatives: 'Relatives',
        internet: 'Internet',
        television: 'Television'
      }
      console.log('Student Data:', this.student);
      console.log("Source of Interest:", this.student.sourceOfInterest);
      console.log('After detectChanges');
    });
    this.cdr.detectChanges(); 
  }
  
  goToStudentList(){
    this.router.navigate(['/surveys']);
}

  updateStudent(){
    this.studentService.updateStudent(this.id, this.student)
    .subscribe(data=>{
      console.log('Updated student data:', data);
      this.student = data;
      this.goToStudentList();
    }, error => console.log(error));
    
  }

  onSelectedOptionChange(value: string): void {
    console.log('Selected option changed:', value);
}
  toggleCheckbox(optionKey: string): void {
    this.student.likedOptions[optionKey] = !this.student.likedOptions[optionKey];
  }
 
  updateSourceOfInterest(optionKey: string): void {
      console.log('Option Key:', optionKey);
      this.student.sourceOfInterest = optionKey;
  }

  
  onSubmit(){
    this.updateStudent();
}
}

