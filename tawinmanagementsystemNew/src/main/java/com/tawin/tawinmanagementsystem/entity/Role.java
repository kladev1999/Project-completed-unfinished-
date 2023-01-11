package com.tawin.tawinmanagementsystem.entity;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;



@Data
@Entity
@Table(name = "employee_role")
public class Role implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRole;

    @Column(name = "name_role")
    private String name;
    
    public Role(){
        
    }

    @JsonIgnore
    @OneToMany(mappedBy = "idRole",fetch = FetchType.LAZY)
    private List<Employee> id;

    public Role(String name){
    super();
    this.name = name;
    }

    
}
