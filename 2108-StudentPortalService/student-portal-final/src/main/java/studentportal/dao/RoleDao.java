package studentportal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import studentportal.model.ERole;
import studentportal.model.Role;

@Repository
public interface RoleDao extends JpaRepository<Role, Integer>{
	public Role findByRoleName(ERole roleName);
}
