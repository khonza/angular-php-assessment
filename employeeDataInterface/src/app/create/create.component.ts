import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';

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
    private employeeService: EmployeeService
  ) {
    this.employeeDataForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
        message: ['', Validators.required]
      }
    );
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  onSubmit() {
    this.employeeService.insertEmployee(this.employeeDataForm.value).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

}
