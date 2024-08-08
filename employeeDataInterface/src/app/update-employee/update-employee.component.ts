import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.model';
import { phoneNumberValidator } from '../../models/phone-number.validator'; // Adjust the path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'update-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})
export class UpdateEmployeeComponent implements OnInit {
  updateEmployeeForm: FormGroup;
  employee: Employee | null = null;

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.updateEmployeeForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const employeeId = params['id'];
      if (employeeId) {
        this.loadEmployee(employeeId);
      }
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (data: Employee) => {
        this.employee = data;
        this.updateEmployeeForm.patchValue(this.employee);
      }
    );
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.updateEmployeeForm.valid) {
      this.employeeService.updateEmployee(this.updateEmployeeForm.value).subscribe(response => {
        if (response) {
          console.log(response);
        }
        this.navigateHome();
      });
    }
  }
}