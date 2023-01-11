package com.tawin.tawinmanagementsystem.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tawin.tawinmanagementsystem.entity.Employee;
import com.tawin.tawinmanagementsystem.repository.EmployeeRepository;
import com.tawin.tawinmanagementsystem.service.EmployeeService;

@Service
public class EmployeeServiceImpl<empRepo> implements EmployeeService{
	@Autowired
	private EmployeeRepository empRepo;
	


	@Override
	public Employee saveEmployee(Employee employee) {
		return empRepo.save(employee);
	}
	
	@Override
	public List<Employee> getAllEmployee() {
		return empRepo.findAll();
	}

}
