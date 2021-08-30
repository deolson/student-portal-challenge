package studentportal.security;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenProvider implements Serializable {

	@Value("${jwt.token.validity}")
    private long TOKEN_VALIDITY;

    @Value("${jwt.signing.key}")
    private String SIGNING_KEY;

    @Value("${jwt.authorities.key}")
    private String AUTHORITIES_KEY;
	
    /**
     * 
     * Method builds and signs the JWT Token that we will pass along to the user. Here we are adding 
     * the user name/collegeEmail, list of comma separated roles, issued time, expiration time into 
     * the JWT
     * 
     * @param authentication object to build our JWT token from
     * @return a JWT token
     */
    public String generateToken(Authentication authentication) {
    	
    	//Grabs the user roles that were added as SimpleGrantedAuthorities is UserDetails and made into an auth object
    	String authorities = authentication.getAuthorities().stream()
    			.map(GrantedAuthority::getAuthority)
    			.collect(Collectors.joining(","));
    	
    	/*
    	 * Builds our JWT
    	 * 
    	 * Sets the subject to the auth obj name, in our case collegeEmail
    	 * Adds a custom JWT value (claim) authorities key which is defined as roles
    	 * Sets the issued time and exp time
    	 * 
    	 * */
    	return Jwts.builder()
    			.setSubject(authentication.getName())
    			.claim(AUTHORITIES_KEY, authorities)
    			.setIssuedAt(new Date(System.currentTimeMillis()))
    			.setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY*1000))
    			.signWith(SignatureAlgorithm.HS256, SIGNING_KEY)
    			.compact();
    }
	
    /**
     * Simple method to pull user name from the token subject
     * 
     * @param token to pull information from
     * @return the user name / college email 
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }
    
    
    /**
     * @param token to pull information from
     * @return JWT expiration date
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }
    
    
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SIGNING_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
    
    /**
     * @param token to check if has expired 
     * @return A boolean value representing if the token has expired
     */
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
   
    
    /**
     * Method to validate a given JWT against a set of user information
     * 
     * @param token - Token to validate 
     * @param userDetails - User Information to check against
     * @return boolean value representing if the given token payload matches the user details and 
     * if the token has expired. 
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    
    /**
     * 
     * Spring Security Context holds information of an authenticated user as an auth object. In order 
     * to construct this auth object we need to provide a UsernamePasswordAuthToken.
     * 
     * @param token that we parse for a user's given roles
     * @param userDetails containing the information about our user
     * @return An Authentication token containing our user details as well as a collection of roles
     */
    UsernamePasswordAuthenticationToken getAuthenticationToken(String token, Authentication existingAuth, UserDetails userDetails) {

        final JwtParser jwtParser = Jwts.parser().setSigningKey(SIGNING_KEY);
        final Jws<Claims> claimsJws = jwtParser.parseClaimsJws(token);
        final Claims claims = claimsJws.getBody();

        final Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        return new UsernamePasswordAuthenticationToken(userDetails, "", authorities);
    }
    
}
