package com.tawin.tawinmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tawin.tawinmanagementsystem.entity.Employee;



@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    
    @Query(value = "SELECT * FROM Employee",nativeQuery = true)
    public List<Employee>findByName();
    
    
    
}
