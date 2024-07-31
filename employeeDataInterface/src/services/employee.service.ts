import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees } from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Employees[]>('http://localhost/employeeAPI/getEmployees.php');
  }
}
