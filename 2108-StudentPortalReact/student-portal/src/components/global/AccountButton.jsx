import React, { useState, useEffect } from 'react'
import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logoutStudent } from '../../redux/actions-thunks'

import { Storage } from 'aws-amplify'

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [url, setURL] = useState([])
  const student = useSelector((state) => state.auth.student)

  useEffect(() => {
    getProfilePicture(student.profilePic)
  })

  const getProfilePicture = (profileImg) => {
    console.log('getting' + profileImg)
    Storage.get(profileImg)
      .then((url) => {
        const myRequest = new Request(url)
        fetch(myRequest).then(function (response) {
          if (response.status === 200) {
            setURL(url)
          }
        })
      })
      .catch((err) => console.log(err))
  }

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
