import React, { useState, useEffect } from 'react'
import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { getProfilePic } from '../../util/awsbucket'
import { RootState } from '../../redux/store'
import { logoutStudent } from '../../redux/thunks'

export default function AccountButton () {
  const history = useHistory()
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const linkToProfile = () => {
    history.push('/home')
    handleClose()
  }

  const logout = () => {
    dispatch(logoutStudent())
    handleClose()
  }

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [url, setProfileUrl] = useState('')
  const student = useSelector((state: RootState) => state.auth.student)

  // useEffect(() => {
  //     if (student.profilePic) {
  //         getProfilePic(student.profilePic).then((picURL) =>
  //             setProfileUrl(picURL)
  //         );
  //     }
  // }, [student.profilePic]);

  return (
    <>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        {url ? <Avatar src={url} /> : <AccountCircle />}
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={linkToProfile}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
