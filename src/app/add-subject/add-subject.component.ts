import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, FormArray} from '@angular/forms'
import { SubjectsService } from '../services/subjects.service';


@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css'
})
export class AddSubjectComponent {
  subjectForm!: FormGroup;
  subjectId:any;
  selectedSubject:any;
  edit = false;

  constructor(private service:SubjectsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.subjectForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
      creditos: new FormControl(''),
    });


    this.subjectId = this.activatedRoute.snapshot.paramMap.get('id');
    if(!Object.is(this.subjectId, null)){
      this.service.getSubjectById(this.subjectId)
      .subscribe(response => {
        this.selectedSubject = response;
        this.edit = true;

        this.subjectForm = new FormGroup({
          id: new FormControl(this.selectedSubject.id),
          nombre: new FormControl(this.selectedSubject.id),
          creditos: new FormControl(this.selectedSubject.creditos),
        
        });
      });
    }else{
      this.subjectForm = new FormGroup({
        id: new FormControl(),
        nombre: new FormControl(),
        creditos: new FormControl()
      });
    }
  }

  submit(){
    this.service.addSubject(this.subjectForm.value)
    .subscribe(response => {
      console.log(response);
    });
    
    if(this.edit){
      this.router.navigate(['subjects'])
      .then(() => {
        window.location.reload();
      })
      this.edit = false;
    }else{
      this.refresh();
    }
    
  }


  refresh(): void {
    window.location.reload();
  }

}
