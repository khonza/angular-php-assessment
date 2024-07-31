import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'create',
  standalone: true,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule
  ]
})
export class CreateComponent implements OnInit {
  
  employeeDataForm:FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.employeeDataForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        message: [false, Validators.required]
      }
    );
  }

  ngOnInit( ) {
  }

  onSubmit() {
    console.log(this.employeeDataForm.value); 
  }

}
