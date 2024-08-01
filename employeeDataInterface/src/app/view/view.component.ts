import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.model';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'view',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy{
  private employeeSubscription: Subscription;
  public employees: Employee[];

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.setEmployees();
  }

  setEmployees(): void{
     this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.employeeSubscription) this.employeeSubscription.unsubscribe();
  }
}
