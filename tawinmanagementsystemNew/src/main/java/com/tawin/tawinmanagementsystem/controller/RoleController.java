package com.tawin.tawinmanagementsystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tawin.tawinmanagementsystem.entity.Role;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.RoleRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/r1/")
public class RoleController {
    @Autowired
	private RoleRepository roleRepository;

    @GetMapping("/roles")
	public List<Role> getAllEmployees(){
		return roleRepository.findAll();
	}

	@PostMapping("/roles")
	public Role createRole(@RequestBody Role role){
		return roleRepository.save(role);
	}

	@GetMapping("/roles/{id}")
	public ResponseEntity<Role> getMethodName(@PathVariable Long id) {
		Role role = roleRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Role not found." + id));
		
		return ResponseEntity.ok(role);
	}

	@PutMapping("/roles/{id}")
	public ResponseEntity<Role> updateRole(@PathVariable Long id , @RequestBody Role roleDetails) {
		Role role = roleRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Role not found." + id));

		role.setName(roleDetails.getName());

		Role updateRole = roleRepository.save(role);
		return ResponseEntity.ok(updateRole);
	}
	
	@DeleteMapping("/roles/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteRole(@PathVariable Long id){
		Role role = roleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Role not exist with id :" + id));
		
		roleRepository.delete(role);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
} 
