import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private url = 'http://localhost:8080/materias/';

  constructor(private httpClient: HttpClient) { }

  getAllSubjects(){
    return this.httpClient.get(this.url + "get-all");
  }

  addSubject(subject: any){
    return this.httpClient.post(this.url + "add-subject", subject);
  }

  getSubjectById(studentId: string){
    let params = new HttpParams();
    params = params.append('id', studentId);
    return this.httpClient.get(this.url + "get-by-id", {params: params})
  }

  deleteSubject(subjectId: Int32Array){

    let params = new HttpParams();
    params = params.append('id', subjectId.toString());

    return this.httpClient.get(this.url + "delete", {params: params});
  }
}
