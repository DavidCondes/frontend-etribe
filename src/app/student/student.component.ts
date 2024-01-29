import { Component} from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent{
  students:any;
  selectedStudent:any;

  addOrUpdate = { type: 'Add'};
  

  constructor(private service:StudentsService) {}

  ngOnInit() {
  
    this.service.getAllStudents()
      .subscribe(response => {
        this.students = response;
      });
    
  }

  deleteStudent(subjectId:Int32Array) {
    this.service.deleteStudent(subjectId)
    .subscribe(response => {
      console.log(response);
    })

    this.refresh();
  }

  searchById(subjectId:string){
    this.service.getStudentById(subjectId)
    .subscribe(response => {
      if(!Array.isArray(response)){
        this.students = [];
        if(!Object.is(response, null)){
          this.students.push(response);
        }
      }else{
        this.students = response;
      }
    });
  }

  findAll(){
    this.refresh();
  }

  selectToupdateStudent(student:any){
    this.selectedStudent = student;
  }

  refresh(): void {
    window.location.reload();
  }


}
