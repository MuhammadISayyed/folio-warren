import { Button } from 'react-aria-components'
import { signOut } from '../../lib/authActions'
import { useNavigate, Link } from 'react-router-dom'

const AppNav = () => {
  const navigate = useNavigate()

  const handleSignOutPress = async () => {
    // If I don't refresh, the user can click on sign in again and access the data.
    // This means that the sign out needs a refresh to take place?
    await signOut()
    navigate('/')
  }

  return (
    <div>
      <Link to="/">Warren Goals</Link>
      <nav>
        <Button onPress={handleSignOutPress}>Sign Out</Button>
        <Button>Check my CV</Button>
      </nav>
    </div>
  )
}

export default AppNav
