package com.tawin.tawinmanagementsystem.entity;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
@Entity
@Data
@Table(name = "employee")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "name_Emp")
	private String name_Emp;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "phone")
	private String phone;

	@Column(name = "address")
	private String address;

	@Column(name = "line")
	private String line;

	@Column(name = "image")
	private String image;


	public Employee() {
		
	}

	@ManyToOne
	@JoinColumn(name = "idRole")
	private Role idRole;
	
    @JsonIgnore
    @OneToMany(mappedBy = "id",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Order_Menu> orderMenu_ID;
	
}
