package studentportal.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.apache.commons.text.RandomStringGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="users")
public class User {
	
	private static final int INITIAL_PASSWORD_LENGTH = 8;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;

	@Email
	@Column(name = "college_email", nullable = false, unique = true)
	private String collegeEmail; //College email issued by the university
	 
	@Email
	@NotBlank
	@Column(name = "recovery_email", nullable = false, unique = true)
	private String recoveryEmail; //Personal email for recovery/communication

	@JsonIgnore
	@Column(name = "password", nullable = false)
	private String password;

	@NotBlank
	@Column(name = "first_name", nullable = false)
	private String firstName;

	@NotBlank
	@Column(name = "last_name", nullable = false)
	private String lastName;
	
	
	@Column(name="date_of_birth")
	private LocalDate dateOfBirth;
	
	@Column(name="profile_pic")
	private String profilePic;
	
	@ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
	@JoinColumn(name="address_id")
	private Address address;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable( name = "user_roles",
	joinColumns = @JoinColumn(name = "user_id"),
	inverseJoinColumns = @JoinColumn(name= "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	public User(String recoveryEmail, String firstName, String lastName) {
		this.recoveryEmail = recoveryEmail;
		this.firstName = firstName;
		this.lastName = lastName;
	}	
	
	/**
	 * 
	 * Method to generate a random password made up of characters a-z using apache commons Random String generator. This 
	 * should be used when the user is initially created and sent to them via email
	 * 
	 * @return random string of characters a-z of given PASSWORD_LENGTH variable
	 */
	public static String generateRandomSpecialCharacters() {
		RandomStringGenerator pwdGenerator = new RandomStringGenerator.Builder().withinRange('a', 'z').build();
		return pwdGenerator.generate(INITIAL_PASSWORD_LENGTH);
	}

}
