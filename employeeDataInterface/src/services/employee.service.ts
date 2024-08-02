import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employees.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost/employeeAPI/getEmployees.php');
  }

  deleteEmployeeById(id:number) {
    return this.http.delete<Employee[]>('http://localhost/employeeAPI/deleteEmployee.php?id=' + id);
  }

  insertEmployee(employee:Employee) {
    return this.http.post<Employee>('http://localhost/employeeAPI/insertEmployee.php', employee);
  }
}
