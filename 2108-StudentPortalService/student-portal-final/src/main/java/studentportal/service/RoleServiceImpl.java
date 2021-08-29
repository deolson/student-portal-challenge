package studentportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NoArgsConstructor;
import studentportal.dao.RoleDao;
import studentportal.model.ERole;
import studentportal.model.Role;

@Service
@NoArgsConstructor
public class RoleServiceImpl implements RoleService {

	private RoleDao roleDao;
	
	@Autowired
	public RoleServiceImpl(RoleDao roleDao) {
		this.roleDao = roleDao;
	}
	
	@Override
	public Role findByRoleName(ERole roleName) {
		return roleDao.findByRoleName(roleName);
	}
	
	public Role save(Role role) {
		return roleDao.save(role);
	}

}
