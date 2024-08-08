import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { phoneNumberValidator } from '../../models/phone-number.validator';

@Component({
  selector: 'create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit, OnDestroy {
  @ViewChild('addEmployee') addEmployeeTemplate: TemplateRef<any>;
  employeeDataForm: FormGroup;
  private modalService: NgbModal;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    modalService: NgbModal
  ) {
    this.modalService = modalService;
    this.employeeDataForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  open(content: TemplateRef<any>): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => this.router.navigate(['/']),
      () => this.router.navigate(['/'])
    );
  }

  onSubmit(): void {
    if (this.employeeDataForm.invalid) {
      return;
    }

    this.subscriptions.add(
      this.employeeService.insertEmployee(this.employeeDataForm.value).subscribe(
        () => {
          this.toastr.success('New employee added', 'Success');
          this.employeeDataForm.reset();
        },
        () => this.toastr.error('Failed to add employee')
      )
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.employeeDataForm.get(field);
    let test = control?.invalid && (control?.dirty || control?.touched);
    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
