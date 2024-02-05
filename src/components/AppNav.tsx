import { Button } from 'react-aria-components'
import { signOut } from '../../lib/authActions'
import { useNavigate, Link } from 'react-router-dom'
import styles from '../styles/appNav.module.css'

const AppNav = () => {
  const navigate = useNavigate()

  const handleSignOutPress = async () => {
    // If I don't refresh, the user can click on sign in again and access the data.
    // This means that the sign out needs a refresh to take place?
    await signOut()
    navigate('/')
    location.reload()
  }

  return (
    <div className={styles.menuContainer}>
      <Link to="/goals" className={styles.logo}>
        Warren Goals
      </Link>
      <nav className={styles.menuNav}>
        <Button onPress={handleSignOutPress}>Sign Out</Button>
        <Button>Check my CV</Button>
      </nav>
    </div>
  )
}

export default AppNav
