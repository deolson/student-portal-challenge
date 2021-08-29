package studentportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Simple Address model that tries to mirror Google API and 
 *
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Addresses")
public final class Address {

	@Id
	@Column(name="address_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int addressId;
	
	@NaturalId
	@Column(name="place_id",unique = true, nullable = false)
	private String placeId;
	
	@Column(name="streetNumber")
	private String streetNumber;
	
	@Column(name="route")
	private String route;
	
	@Column(name="locality")
	private String locality;
	
	@Column(name="administrativeAreaLevel1")
	private String administrativeAreaLevel1;
	
	@Column(name="country")
	private String country;
	
	@Column(name="postalCode")
	private String postalCode;

	@Override
	public String toString() {
		return placeId+": " + streetNumber +" "+ route +" "+ locality +" "+ administrativeAreaLevel1 +" "+ country +" "+ postalCode;
	}

}
