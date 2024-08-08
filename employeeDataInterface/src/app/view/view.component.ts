import { Component, ElementRef, inject, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.model';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'events';
import { CreateComponent } from '../create/create.component';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy{
  private employeeSubscription: Subscription;
  public employees: Employee[];
  @Output() updateEmployeeEmitter = new EventEmitter<any>();
  updateEmployeeForm:FormGroup;
  private modalService = inject(NgbModal);
	closeResult = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toast:ToastrService
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

  navigateToUpdateEmployee(id:number):void {
    this.router.navigate(['update-employee', id]);
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

  goToItemDetails(itemID: number) {
    this.router.navigate(['/items', itemID]);
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

  deleteEmployeeById(id:any):void {
    let employeeName:string = this.setEmployeeName(id);
    if(confirm("Are you sure you want to delete "+ employeeName )) {
      this.employeeService.deleteEmployeeById(id).subscribe(response =>
      {
        this.employees = this.employees.filter(employee => employee.id != id);
        this.toast.success(`${employeeName} (${id}) has been deleted.`);
      });
    }
  }

  private setEmployeeName(id:number):string {
    let employee = this.employees.find(employee => employee.id === id);
    return employee?.firstName + ' ' + employee?.lastName;
  }

  ngOnDestroy(): void {
    if(this.employeeSubscription) this.employeeSubscription.unsubscribe();
  }
}
