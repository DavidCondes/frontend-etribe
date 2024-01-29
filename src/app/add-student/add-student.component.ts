import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule, FormGroup, FormArray} from '@angular/forms'
import { SubjectsService } from '../services/subjects.service';
import { StudentsService } from '../services/students.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent{
  
  studentId:any;
  edit = false;
  selectedStudent:any;
  studentForm!: FormGroup;
  subjects:any;

  constructor(private service:SubjectsService, 
              private stService: StudentsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {

    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    if(!Object.is(this.studentId, null)){
      this.stService.getStudentById(this.studentId)
      .subscribe(response => {
        this.edit = true;
        this.selectedStudent = response;
        

        this.studentForm = new FormGroup({
          id: new FormControl(this.selectedStudent.id),
          nombre: new FormControl(this.selectedStudent.nombre),
          apellido: new FormControl(this.selectedStudent.apellido),
          edad: new FormControl(this.selectedStudent.edad),
          telefono: new FormControl(this.selectedStudent.telefono),
          correo: new FormControl(this.selectedStudent.correo),
          materias: new FormArray([])
        });
      });
    }else{
      this.studentForm = new FormGroup({
        id: new FormControl(),
        nombre: new FormControl(),
        apellido: new FormControl(),
        edad: new FormControl(),
        telefono: new FormControl(),
        correo: new FormControl(),
        materias: new FormArray([])
      });
    }
  
    this.service.getAllSubjects()
    .subscribe(response => {
      this.subjects = response;
    });


  }

  refresh(): void {
    window.location.reload();
  }

  submit(){
    console.log(this.studentForm.value);
    this.stService.addStudent(this.studentForm.value)
    .subscribe(response => {
      console.log(response);
    });

    if(this.edit){
      this.router.navigate(['students'])
      .then(() => {
        window.location.reload();
      })
      this.edit = false;
    }else{
      this.refresh();
    }
    
    this.refresh();
  }
}
