import React from 'react'
import { NavLink } from 'react-router-dom'

function StyledLink (props) {
  return <NavLink style={{ textDecoration: 'none', color: 'white' }} {...props} />
}

export default StyledLink
