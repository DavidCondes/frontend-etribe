import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router';
import { SubjectsService } from '../services/subjects.service';



@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  subjects:any;
  

  constructor(private service:SubjectsService) {}


  ngOnInit() {
  
    this.service.getAllSubjects()
      .subscribe(response => {
        this.subjects = response;
      });
    
  }

  deleteSubject(subjectId:Int32Array) {
    this.service.deleteSubject(subjectId)
    .subscribe(response => {
      console.log(response);
    })
    
    this.refresh();
  }

  searchById(subjectId:string){
    this.service.getSubjectById(subjectId)
    .subscribe(response => {
      if(!Array.isArray(response)){
        this.subjects = [];
        if(!Object.is(response, null)){
          this.subjects.push(response);
        }
      }else{
        this.subjects = response;
      }
    });
  }

  findAll(){
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
  
}

  

