package studentportal.dao;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import studentportal.model.Role;
import studentportal.model.User;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
	
	public Set<User> findByRolesIn(Set<Role> roles);
	
	public User findByCollegeEmail(String collegeEmail);
	public User findByRecoveryEmail(String recoveryEmail);
	
	public Boolean existsByCollegeEmail(String email);
	public Boolean existsByRecoveryEmail(String email);
	
}
