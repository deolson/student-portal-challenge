import React from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Grid, Tab, Tabs, InputBase, AppBar, Button } from '@material-ui/core/'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../../redux/hooks'
import AccountButton from './AccountButton'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

export default function PrimarySearchAppBar () {
  const classes = useStyles()
  const history = useHistory()
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.loggedIn
  )

  function handleHomeClick () {
    history.push('/')
  }

  function handle404Click () {
    history.push('/404')
  }

  return (
    <AppBar position='static'>
      <Grid container alignItems='center'>
        <Grid item xs={12} md={12} lg={6}>
          <Tabs
            value={false}
            TabIndicatorProps={{
              style: { backgroundColor: 'white' }
            }}
          >
            <Tab component={Button} onClick={handleHomeClick} label='HOME' />
            <Tab component={Button} onClick={handle404Click} label='ABOUT' />
            <Tab component={Button} onClick={handle404Click} label='BLOG' />
            <Tab component={Button} onClick={handle404Click} label='GALLERY' />
            <Tab
              component={Button}
              onClick={handle404Click}
              label='CONTACT US'
            />
          </Tabs>
        </Grid>
        <div className={classes.grow} />
        <Grid item xs={isLoggedIn ? 10 : 12} lg={4}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Grid>
        {isLoggedIn && (
          <Grid item xs={2} style={{ textAlign: 'center' }}>
            <AccountButton />
          </Grid>
        )}
      </Grid>
    </AppBar>
  )
}
