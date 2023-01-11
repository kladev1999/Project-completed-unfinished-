package com.tawin.tawinmanagementsystem.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tawin.tawinmanagementsystem.entity.Role;





@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
}
