package studentportal.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.NoArgsConstructor;

/**
 * JWT authentication filter, which will filter out requests that have JWT as header and
 * translate them to UsernamePasswordAuthenticationToken which the security context understands.
 * 
 * Extends Once Per Request Filter, so every request is searched looking for a JWT token. 
 *
 */
@NoArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

	private TokenProvider jwtTokenUtil;
	private UserDetailsService userDetailsService;
	
	@Autowired
	public JwtFilter(UserDetailsService userDetailsService, TokenProvider jwtTokenUtil) {
		this.jwtTokenUtil = jwtTokenUtil;
		this.userDetailsService = userDetailsService;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		//Grabs the request authorization header
		final String authorizationHeader = request.getHeader("Authorization");
		
		String username = null;
        String authToken = null;
        
        //If we have an authorization header and it starts with Bearer we have a JWT token, we can then
        //grab that token and pull the username/collegeEmail from it
		if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			authToken = authorizationHeader.substring(7);
			username = jwtTokenUtil.getUsernameFromToken(authToken);
		}
		
		//If we were able to get a user name from the token and there is no authentication information available 
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

        	//load user details based on the given user name
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            //Validate the token based on the loaded user details and build new authentication details to
            //provide to our security context based on this information
            if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = jwtTokenUtil.getAuthenticationToken(authToken, SecurityContextHolder.getContext().getAuthentication(), userDetails);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
		
	}

}
