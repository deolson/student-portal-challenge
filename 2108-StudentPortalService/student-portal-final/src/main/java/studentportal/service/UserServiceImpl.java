package studentportal.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.NoArgsConstructor;
import studentportal.dao.AddressDao;
import studentportal.dao.UserDao;
import studentportal.model.Address;
import studentportal.model.ERole;
import studentportal.model.Role;
import studentportal.model.User;
import studentportal.util.SendingEmail;

@Service
@NoArgsConstructor
public class UserServiceImpl implements UserService {

	private RoleService roleService;
	private UserDao userDao;
	private AddressDao addressDao;
	private BCryptPasswordEncoder bcryptEncoder;

	@Autowired
	public UserServiceImpl(RoleService roleService, UserDao userDao, BCryptPasswordEncoder bcryptEncoder, AddressDao addressDao) {
		this.roleService = roleService;
		this.userDao = userDao;
		this.bcryptEncoder = bcryptEncoder;
		this.addressDao = addressDao;
	}

	/**
	 *@param Takes in a Data Transfer Object in the form of a partial user, 
	 * which allows us to update the section of information that we deem mutable
	 *
	 *@return Updated user
	 *
	 */
	@Override
	public User save(User partialUser) {
		User user = userDao.findByCollegeEmail(partialUser.getCollegeEmail());
		if(partialUser.getAddress() != null) {	
			System.out.println("address not null");
			Address existingAddress = addressDao.findByPlaceId(partialUser.getAddress().getPlaceId());
			if(existingAddress != null) {				
				user.setAddress(existingAddress);
			} else {
				addressDao.save(partialUser.getAddress());
				user.setAddress(partialUser.getAddress());
			}
		}
		user.setDateOfBirth(partialUser.getDateOfBirth());
		user.setProfilePic(partialUser.getProfilePic());
		user.setFirstName(partialUser.getFirstName());
		user.setLastName(partialUser.getLastName());
		return userDao.save(user);
	}

	@Override
	public User registerStudent(User user) throws MessagingException {
		String pass = User.generateRandomSpecialCharacters();
		user.setPassword(bcryptEncoder.encode(pass));
		user.getRoles().add(roleService.findByRoleName(ERole.ROLE_STUDENT));

		String firstName = user.getFirstName();
		String lastName = user.getLastName();
		user.setCollegeEmail(firstName.toLowerCase() + "." + lastName.toLowerCase() + "@college.edu");

		int count = 2;
		while (userDao.existsByCollegeEmail(user.getCollegeEmail())) {
			user.setCollegeEmail(firstName + "." + lastName + "x" + count + "@college.edu");
			count++;
		}
		SendingEmail.sendMail(user.getRecoveryEmail(), user.getCollegeEmail() , pass );
		return userDao.save(user);
	}

	@Override
	public List<User> findAll() {
		return userDao.findAll();
	}

	@Override
	public User findByCollegeEmail(String collegeEmail) {
		return userDao.findByCollegeEmail(collegeEmail);
	}

	@Override
	public User findByRecoveryEmail(String recoveryEmail) {
		return userDao.findByRecoveryEmail(recoveryEmail);
	}

	@Override
	public Boolean existsByCollegeEmail(String email) {
		return userDao.existsByCollegeEmail(email);
	}

	
	@Override
	public Boolean existsByRecoveryEmail(String email) {
		return userDao.existsByRecoveryEmail(email);
	}

	@Override
	public Set<User> findAllStudents() {
		Set<Role> studentSet = new HashSet<Role>();
		studentSet.add(roleService.findByRoleName(ERole.ROLE_STUDENT));
		return userDao.findByRolesIn(studentSet);
	}
	
	@PostConstruct
	public void addFirstUser() {
		roleService.save(new Role(ERole.ROLE_STUDENT));
		roleService.save(new Role(ERole.ROLE_ADMIN));
		User user = new User("default@recovery.edu","First","Last");
		user.setCollegeEmail("default@admin.edu");
		user.setPassword(bcryptEncoder.encode("pass"));
		user.getRoles().add(roleService.findByRoleName(ERole.ROLE_ADMIN));
		userDao.save(user);
	}

}
