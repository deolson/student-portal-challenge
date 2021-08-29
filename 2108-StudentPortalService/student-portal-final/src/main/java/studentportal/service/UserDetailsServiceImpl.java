package studentportal.service;

import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import studentportal.dao.UserDao;
import studentportal.model.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private UserDao userDao;
	
	@Autowired
	public UserDetailsServiceImpl(UserDao userDao) {
		this.userDao = userDao;
	}
	
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String collegeEmail) throws UsernameNotFoundException {
    	System.out.println("loading");
    	User user = userDao.findByCollegeEmail(collegeEmail);
    	System.out.println("service user"+user);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
    	return new org.springframework.security.core.userdetails.User(user.getCollegeEmail(), user.getPassword(), getAuthority(user));
    }
    
    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRoleName().name()));
        });
        return authorities;
    }
}
