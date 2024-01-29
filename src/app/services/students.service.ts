import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private url = 'http://localhost:8080/students/';

  constructor(private httpClient: HttpClient) { }

  getAllStudents(){
    return this.httpClient.get(this.url + "get-all");
  }

  addStudent(student: any){
    return this.httpClient.post(this.url + "add-student", student);
  }

  getStudentById(studentId: string){
    let params = new HttpParams();
    params = params.append('id', studentId);
    return this.httpClient.get(this.url + "get-by-id", {params: params})
  }

  deleteStudent(studentId: Int32Array){

    let params = new HttpParams();
    params = params.append('id', studentId.toString());

    return this.httpClient.get(this.url + "delete", {params: params});
  }

}
