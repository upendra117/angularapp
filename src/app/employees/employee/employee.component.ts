import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service'
import { NgForm } from '@angular/forms'


// Toastr Imports
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public employeeService: EmployeeService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(employeeForm: NgForm) {
    if(employeeForm.value.$key == null)
      this.employeeService.insertEmployee(employeeForm.value);
    else
      this.employeeService.updateEmployee(employeeForm.value);
    
    this.resetForm(employeeForm);
    this.toastrService.success('Submitted Successfully', ' Employee Register')
  }

  resetForm(employeeForm?: NgForm) {
    if(employeeForm != null) 
      employeeForm.reset();
    this.employeeService.selectedEmployee = {
        $key: null,
        name: '',
        position: '',
        office: '',
        salary: 0
      }
    
}

}
