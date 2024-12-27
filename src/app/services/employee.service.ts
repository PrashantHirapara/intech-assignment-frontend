import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/employees`);
  }

  getEmployeesByDepartment(departmentId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/employees/department/${departmentId}`
    );
  }

  getEmployeeById(employeeId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employees/${employeeId}`);
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/employees/${employee.id}`,
      employee
    );
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/employees/${employeeId}`
    );
  }

  saveEmployee(employee: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/department/${employee.departmentId}`,
      employee
    );
  }
}
