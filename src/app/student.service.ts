import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL= "http://localhost:8080/api/v1/surveys"
  private baseURLForInsert = "http://localhost:8080/api/v1/survey"
  constructor(private httpClient : HttpClient) { }

  getStudentsList() :  Observable<Student[]>{

    return this.httpClient.get<Student[]>(`${this.baseURL}`)
  }

  createStudentSurvey(student: Student) : Observable<Object>{
      console.log('Student Object:', student);
      return this.httpClient.post(`${this.baseURLForInsert}`, student);
  }

  getStudentById(id : number): Observable<Student>{
    return this.httpClient.get<Student>(`${this.baseURL}/${id}`);
  }

  updateStudent(id: number, stduent: Student): Observable<any>{
    return this.httpClient.put(`${this.baseURL}/${id}`, stduent);
  }

  deleteStudent(id: number): Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }




}
