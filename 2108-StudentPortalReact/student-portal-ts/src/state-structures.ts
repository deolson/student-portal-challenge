// SUPPORTING STATE MODELS
export interface IUser{
  userId: number
  collegeEmail: string
  recoveryEmail: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  address?: IAddress
  profilePic?: string
  roles?: IRole[]
}

enum Role{
  ROLE_STUDENT,
  ROLE_ADMIN
}

export interface IRole{
  roleId: number
  roleName: Role
}

export interface IAddress{
  addressId?: number
  placeId: string
  streetNumber?: string
  route?: string
  locality?: string
  administrativeAreaLevel1?: string
  country?: string
  postalCode?: string
}

export interface IAddressComponents{
  long_name: string,
  short_name: string,
  types: string[]
}

export interface IAdmin{
  adminId: number
  collegeEmail: string
  password: string
}

export interface IJwtRequest {
  collegeEmail: string
  password: string
}

export interface IJwtResponse {
  jwtToken: string
  user: IUser
}
