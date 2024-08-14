import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.model';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'view',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    CreateComponent,
    RouterModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewComponent implements OnInit, OnDestroy {
  @Input() newEmployeeEvent = '';
  employees: Employee[] = [];
  private employeeSubscription: Subscription = new Subscription();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeSubscription.add(
      this.employeeService.getEmployees().subscribe(
        (data: Employee[]) => this.employees = data,
        error => this.toastr.error('Failed to load employees.')
      )
    );
  }

  navigateToUpdateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }

  confirmDelete(id: number, firstName: string, lastName: string): void {
    const employeeName = `${firstName} ${lastName}`;
    if (confirm(`Are you sure you want to delete ${employeeName}?`)) {
      this.deleteEmployeeById(id);
    }
  }

  deleteEmployeeById(id: number): void {
    this.employeeSubscription.add(
      this.employeeService.deleteEmployeeById(id).subscribe(
        () => {
          this.employees = this.employees.filter(employee => employee.id !== id);
          this.toastr.success('Employee has been deleted.');
        },
        error => this.toastr.error('Failed to delete employee.')
      )
    );
  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
  }
}
