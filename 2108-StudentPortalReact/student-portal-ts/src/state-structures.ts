// SUPPORTING STATE MODELS
export interface IStudent{
  studentId: number
  collegeEmail: string
  recoveryEmail: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  address?: IAddress
  profilePic?: string
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

export interface IAdmin{
  adminId: number
  collegeEmail: string
  password: string
}
