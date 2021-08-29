package studentportal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import studentportal.model.Address;

@Repository
public interface AddressDao extends JpaRepository<Address, Integer> {
	public Address findByPlaceId(String placeId);
	public boolean existsByPlaceId(String placeId);
}
