import React, { ReactElement, useEffect, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { getProfilePic } from '../../../util/awsbucket'
import { Cake, Edit, LocationOn } from '@material-ui/icons'
import { UploadPhotoButton } from './UploadPhotoButton'
import { useAppSelector } from '../../../redux/hooks'
import { RootState } from '../../../redux/store'
import EditStudentNameForm from '../Form/Edit/EditStudentNameForm'
import { formatDate, toLocalDate } from '../../../util/date'
import EditStudentBirthday from '../Form/Edit/EditStudentBirthday'
import EditStudentAddress from '../Form/Edit/EditStudentAddress'

const useStyle = makeStyles(() => ({
  root: {
    width: 300,
    textAlign: 'center'
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 10
  },
  space: {
    margin: 10
  }
}))

export default function StudentProfileCard (): ReactElement {
  const classes = useStyle()
  const profilePic = useAppSelector((state: RootState) => state.auth.user.profilePic)
  const address = useAppSelector((state: RootState) => state.auth.user.address)
  const firstName = useAppSelector((state: RootState) => state.auth.user.firstName)
  const lastName = useAppSelector((state: RootState) => state.auth.user.lastName)
  const dateOfBirth = useAppSelector((state: RootState) => state.auth.user.dateOfBirth)
  const [profileUrl, setProfileUrl] = useState(profilePic)
  const [editName, setEditName] = useState(false)
  const [editBirthday, setEditBirthday] = useState(false)
  const [editAddress, setEditAddress] = useState(false)

  useEffect(() => {
    if (profilePic) {
      getProfilePic(profilePic).then((picURL) =>
        setProfileUrl(picURL)
      )
    }
  }, [profilePic])

  function handleEditNameClick () {
    setEditAddress(false)
    setEditBirthday(false)
    setEditName(!editName)
  }

  function handleEditBirthdayClick () {
    setEditAddress(false)
    setEditName(false)
    setEditBirthday(!editBirthday)
  }

  function handleEditAddressClick () {
    setEditName(false)
    setEditBirthday(false)
    setEditAddress(!editAddress)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justifyContent='center'>
          <Grid item container xs={12} justifyContent='center'>
            <Badge
              overlap='circular'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              badgeContent={
                <UploadPhotoButton />
              }
            >
              <Avatar
                src={profileUrl}
                className={classes.avatar}
              />
            </Badge>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h5'
              align='center'
              className={classes.space}
              color='primary'
            >
              {firstName + ' ' + lastName}
            </Typography>
          </Grid>
          {editName && <EditStudentNameForm setEditName={setEditName} />}
          <Grid
            item
            container
            xs={12}
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='body1' display='inline' className={classes.space}>
            <LocationOn color='primary' />
              {address != null
                ? address.placeId
                : 'No Address Information'}
            </Typography>
          </Grid>
          {editAddress && <EditStudentAddress setEditAddress={setEditAddress} />}
          <Grid
            item
            container
            xs={12}
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='body1' display='inline' className={classes.space}>
              <Cake color='primary' />
              {dateOfBirth != null
                ? formatDate(dateOfBirth)
                : 'No Date of Birth Information'}
            </Typography>
          </Grid>
          {editBirthday && <EditStudentBirthday setEditBirthday={setEditBirthday} />}
        </Grid>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={handleEditNameClick}>Edit Name</Button>
        <Button size='small' onClick={handleEditAddressClick}>Edit Address</Button>
        <Button size='small' onClick={handleEditBirthdayClick}>Edit Birth Date</Button>
      </CardActions>
    </Card>
  )
}
