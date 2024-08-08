import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject, TemplateRef } from '@angular/core';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'create',
  standalone: true,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    NgbDatepickerModule
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateComponent {
  @ViewChild('createEditModal') createEditModal: ElementRef;
  employeeDataForm:FormGroup;
  public submitted = false;

  private modalService = inject(NgbModal);
	closeResult = '';

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public router: Router,
    private toast: ToastrService
  ) {
    this.employeeDataForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required,Validators.minLength(3)]],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        message: ['', Validators.required]
      }
    );
  }
  
  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => { this.navigateHome(); },
			(reason) => { this.navigateHome(); }
		);
	}

  private navigateHome() {
    this.router.navigate(['/']);
  }
          
  onSubmit() {
    this.employeeService.insertEmployee(this.employeeDataForm.value).subscribe(
      (response) => {
        this.toast.success('New employee added', 'Success');
        if(response) console.log(response);
      }
    );
  }
}
