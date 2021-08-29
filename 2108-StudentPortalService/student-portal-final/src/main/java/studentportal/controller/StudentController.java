package studentportal.controller;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import studentportal.model.User;
import studentportal.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/student")
public class StudentController {
	
	private UserService userService;

	@Autowired
	public StudentController(UserService userService) {
		this.userService = userService;
	}
	
	//////////////////////////////////////////////////CREATE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/register")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody User signUpUser) {
		if(userService.existsByRecoveryEmail(signUpUser.getRecoveryEmail())) {
			return ResponseEntity.badRequest().body("Error: Email is already in use!");
		}
		
		User newStudent = new User(signUpUser.getRecoveryEmail(),
				signUpUser.getFirstName(), 
				signUpUser.getLastName());
		
		userService.registerStudent(newStudent);
		return ResponseEntity.ok("User registered successfully!");
	}
	
	//////////////////////////////////////////////////READ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	@GetMapping("/all")
	public Set<User> getAllStudents() {
		return userService.findAllStudents();
	}
		
	//////////////////////////////////////////////////UPDATE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	@PutMapping("/update")
	public  ResponseEntity<?> updateStudentInfo(@RequestBody User user) {
		System.out.println("Updating user: "+user);
		
		if(!userService.existsByCollegeEmail(user.getCollegeEmail())) {
			return ResponseEntity.badRequest().body("Error: No Student Entity Associated With "+user.getCollegeEmail());
		}

		userService.save(user);
		return ResponseEntity.ok("User updated!");
	}

}
