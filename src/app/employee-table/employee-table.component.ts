import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit {
  searchDepartmentId: string = '';
  employees: any[] = [];
  filteredEmployees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  searchEmployees(): void {
    if (this.searchDepartmentId) {
      this.employeeService
        .getEmployeesByDepartment(this.searchDepartmentId)
        .subscribe(
          (data) => {
            this.filteredEmployees = data;
          },
          (error) => {
            this.filteredEmployees = [];
            console.error('Error fetching employees by department', error);
          }
        );
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  viewEmployee(employeeId: string): void {
    this.router.navigate([`/employee/${employeeId}`]);
  }

  onDeleteEmployee(employeeId: string): void {
    this.employees = this.employees.filter((emp) => emp.id !== employeeId);
  }
}
