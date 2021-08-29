package studentportal.service;

import studentportal.model.ERole;
import studentportal.model.Role;

public interface RoleService {
	public Role findByRoleName(ERole roleName);
	public Role save(Role role);
}
