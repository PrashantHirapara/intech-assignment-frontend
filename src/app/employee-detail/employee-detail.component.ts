import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employeeId: string = '';
  employee: any = {};

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadEmployeeDetails(this.employeeId);
  }

  loadEmployeeDetails(employeeId: string): void {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(
      (data) => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employee-table']);
      },
      (error) => {
        console.error('Error updating employee', error);
      }
    );
  }

  deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      (data) => {
        alert('Employee deleted successfully!');
        this.router.navigate(['/employee-table']);
      },
      (error) => {
        console.error('Error deleting employee', error);
      }
    );
  }
}
