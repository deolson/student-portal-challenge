package studentportal.service;

import java.util.List;
import java.util.Set;

import studentportal.model.User;

public interface UserService {

	//Create
	public User registerStudent(User user);
	
	//Read 
	public List<User> findAll();
	public Set<User> findAllStudents();
	public User findByCollegeEmail(String collegeEmail);
	public User findByRecoveryEmail(String recoveryEmail);
	public Boolean existsByCollegeEmail(String email);
	public Boolean existsByRecoveryEmail(String email);
	
	//Update
	public User save(User user);
}
