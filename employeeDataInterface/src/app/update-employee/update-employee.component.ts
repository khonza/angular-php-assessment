import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.model';

@Component({
  selector: 'update-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    NgbDatepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})
export class UpdateEmployeeComponent {
  private modalService = inject(NgbModal);
	closeResult = '';
  updateEmployeeForm:FormGroup;
  employee: Employee;
  employeeId: number;

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ){
    this.setEmployeeId();
    this.getEmployees();
    this.updateEmployeeForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        message: ['', Validators.required]
      }
    );
  }



  setEmployeeId(): void {
    this.route.params.subscribe((params: Params) => 
      {
        if(params) {
          this.employeeId = params['id'];
        }
      }
    );
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
     (data: Employee[]) => {
       this.employee = data.find(employee => employee.id == this.employeeId)!;
     }
   );
 }

  onSubmit() {
    console.log(this.updateEmployeeForm.value); 
  }
	
}
