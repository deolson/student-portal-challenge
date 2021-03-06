package studentportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import studentportal.model.JwtRequest;
import studentportal.model.JwtResponse;
import studentportal.model.User;
import studentportal.security.TokenProvider;
import studentportal.service.UserService;

/**
 * @author David Olson
 * 
 * Authentication controller to handle user validation. 
 *
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

	private TokenProvider jwtTokenUtil;
	private AuthenticationManager authenticationManager;
	private UserService userService;

	@Autowired
	public AuthController(TokenProvider jwtTokenUtil, AuthenticationManager authenticationManager,
			UserService userService) {
		this.jwtTokenUtil = jwtTokenUtil;
		this.authenticationManager = authenticationManager;
		this.userService = userService;
	}

	/**
	 * 
	 * API end point to authenticate users.
	 * 
	 * @param jwtRequest containing a college email issued by the university used as
	 *                   a user name and password to validate.
	 * 
	 * @return JwtResponse consisting of a generated token defined in the models
	 *         package.
	 */
	@PostMapping("/signin")
	public JwtResponse authenticateUser(@RequestBody JwtRequest jwtRequest) {
		
		//Authentication Manager authenticate is configured in the web security config
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						jwtRequest.getCollegeEmail(), jwtRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		final String token = jwtTokenUtil.generateToken(authentication);
		User user = userService.findByCollegeEmail(jwtRequest.getCollegeEmail());
		return new JwtResponse(token, user);
	}

}
