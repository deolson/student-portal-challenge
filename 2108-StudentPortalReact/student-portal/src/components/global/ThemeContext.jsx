import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: 'black'
  }
})

const Theme = (props) => {
  const { children } = props
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

function withTheme (Component) {
  return (props) => {
    return (
      <Theme>
        <Component {...props} />
      </Theme>
    )
  }
}

export default withTheme
