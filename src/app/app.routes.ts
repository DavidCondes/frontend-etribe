import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject/subject.component';
import { HomeComponent } from './home/home.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AppComponent } from './app.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';

export const routes: Routes = [
    {'path': '', component: HomeComponent},
    {'path': 'students', component:StudentComponent},
    {'path': 'students/new-student', component:AddStudentComponent},
    {'path': 'students/edit-student/:id', component:AddStudentComponent},
    {'path': 'subjects', component:SubjectComponent},
    {'path': 'subjects/new-subject', component:AddSubjectComponent},
    {'path': 'subjects/edit-subject/:id', component:AddSubjectComponent},
];
