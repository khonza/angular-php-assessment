import { Routes } from '@angular/router';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
    { 'path': '', component: ViewComponent},
    { 'path': 'update-employee/:id', component: UpdateEmployeeComponent}
];
