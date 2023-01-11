package com.tawin.tawinmanagementsystem.service;

import java.util.List;

import com.tawin.tawinmanagementsystem.entity.Employee;

public interface EmployeeService {
	public Employee saveEmployee(Employee employee);
	public List<Employee> getAllEmployee();
}
