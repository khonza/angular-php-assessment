import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViewComponent, UpdateEmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employeeDataInterface';
}
