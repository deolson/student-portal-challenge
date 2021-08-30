package studentportal.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author David Olson 
 * 
 * Web Security Configuration processed by the spring container that contains the logic 
 * for overriding the default web security configuration applying this class to the 
 * Security context. 
 *
 * Global method security enabled to restrict which roles are able to execute
 * a particular method.
 *
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private UserDetailsService userDetailsService;
	private JwtFilter jwtFilter;

	@Autowired
	public WebSecurityConfig(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}
	
	public JwtFilter getJwtFilter() {
		return jwtFilter;
	}

	@Autowired
	public void setJwtFilter(JwtFilter jwtFilter) {
		this.jwtFilter = jwtFilter;
	}

	/**
	 * 
	 * Method to configure our authentication manager builder. We are providing our userDetailsService to 
	 * let the authentication manager know where the user name and password have been stored
	 * along with our BCryptPasswordEncoder password encoder here. 
	 * 
	 *@param AuthenticationManagerBuilder to configure 
	 */
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(encoder());
	}

	/**
	 * Configuration of our http security
	 * 
	 * We are disabling our cors and cross site forgery protection on authorized http requests 
	 * that match the signature /auth/signin as we need to allow users to sign before they have a JWT token.
	 * 
	 * Additionally we are configuring our session management policy to be stateless, as we are not using 
	 * sessions.
	 * 
	 * Finally we are adding a filter here to filter each incoming request outside of the 
	 * 
	 * 
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
			.authorizeRequests()
			.antMatchers("/auth/signin").permitAll()
			.anyRequest().authenticated()
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}


	/**  
	 * 
	 * Implementation of the java password encoder interface, that uses the 
	 * BCrypt strong hashing function with default strength of 10. Salt is included in
	 * the hash string to protect against rainbow tables. 
	 * 
	 * @return BCryptPasswordEncoder - an implementation of password encoder  
	 */
	@Bean
	public BCryptPasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	
	/**
	 * Spring Security uses Authentication Manager to validate if a given user 
	 * has the right credentials based on username and password. 
	 *
	 */
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

}
