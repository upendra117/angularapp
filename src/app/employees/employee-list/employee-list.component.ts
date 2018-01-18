import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service'
import { Employee } from '../shared/employee.model';

// Toastr Imports
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    let x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;

        this.employeeList.push(y as Employee);
      })
    })
  }

  onEdit(employee: Employee){
    this.employeeService.selectedEmployee = Object.assign({},employee);
    this.toastrService.warning('Edited Successfully', 'Employee Register')
  }

  onDelete(key: string) {
    if (confirm('Are you sure to deleted this record?') == true) {
      this.employeeService.deleteEmployee(key)
      this.toastrService.warning('Deleted Successfully', 'Employee Register')
    }
  }

}
