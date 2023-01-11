package com.tawin.tawinmanagementsystem.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tawin.tawinmanagementsystem.entity.Type_Menu;
import com.tawin.tawinmanagementsystem.repository.Type_MenuRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/TypeMenu")
public class Type_MenuController {
	@Autowired
	Type_MenuRepository typeMenuRepo;
	
	
	@GetMapping("/getTypeMenu")
	public List<Type_Menu> getMenu(){
		return (List<Type_Menu>) typeMenuRepo.findAll();
	}
	
	@PostMapping("/addTypeMenu")
	public Type_Menu createMenu(@RequestBody Type_Menu typeMenu) {
		typeMenuRepo.save(typeMenu);
		return typeMenu;
	}

}
